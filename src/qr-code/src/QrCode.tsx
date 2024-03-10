import {
  h,
  ref,
  defineComponent,
  watchEffect,
  type PropType,
  computed,
  onMounted
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { type QrCodeTheme, qrcodeLight } from '../styles'
import qrcodegen from './qrcodegen'

type Modules = ReturnType<qrcodegen.QrCode['getModules']>

const ERROR_CORRECTION_LEVEL: Record<string, qrcodegen.QrCode.Ecc> = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH
}

export const qrCodeProps = {
  ...(useTheme.props as ThemeProps<QrCodeTheme>),
  value: String,
  color: {
    type: String,
    default: '#000'
  },
  backgroundColor: {
    type: String,
    default: '#FFF'
  },
  iconSrc: String,
  iconSize: {
    type: Number,
    default: 40
  },
  iconBackgroundColor: {
    type: String,
    default: '#FFF'
  },
  iconBorderRadius: {
    type: Number,
    default: 4
  },
  size: {
    type: Number,
    default: 100
  },
  padding: {
    type: [Number, String] as PropType<string | number>,
    default: 12
  },
  errorCorrectionLevel: {
    type: String,
    default: 'M'
  },
  type: {
    type: String,
    default: 'canvas'
  }
} as const

export type QrCodeProps = ExtractPublicPropTypes<typeof qrCodeProps>

// For retina display
const UPSCALE_RATIO = 2

export default defineComponent({
  name: 'QrCode',
  props: qrCodeProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'QrCode',
      '-qr-code',
      style,
      qrcodeLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      return {
        '--n-border-radius': themeRef.value.self.borderRadius
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('qr-code', undefined, cssVarsRef, props)
      : undefined

    const canvasRef = ref<HTMLCanvasElement>()
    const svgRef = ref<HTMLCanvasElement>()

    const qr = computed(() => {
      const errorCorrectionLevel =
        ERROR_CORRECTION_LEVEL[props.errorCorrectionLevel]
      return qrcodegen.QrCode.encodeText(
        props.value ?? '-',
        errorCorrectionLevel
      )
    })

    onMounted(() => {
      const imageLoadedTrigger = ref(0)
      let loadedIcon: HTMLImageElement | null = null
      watchEffect(() => {
        void imageLoadedTrigger.value
        drawCanvas(
          qr.value,
          props.size,
          props.color,
          props.backgroundColor,
          loadedIcon
            ? {
                icon: loadedIcon,
                iconBorderRadius: props.iconBorderRadius,
                iconSize: props.iconSize,
                iconBackgroundColor: props.iconBackgroundColor
              }
            : null
        )
      })
      watchEffect(() => {
        void imageLoadedTrigger.value
        drawSvg(
          qr.value,
          props.size,
          loadedIcon
            ? {
                icon: loadedIcon,
                iconBorderRadius: props.iconBorderRadius,
                iconSize: props.iconSize,
                iconBackgroundColor: props.iconBackgroundColor
              }
            : null
        )
      })
      watchEffect(() => {
        const { iconSrc } = props
        if (iconSrc) {
          let aborted = false
          const img = new Image()
          img.src = iconSrc
          img.onload = () => {
            if (aborted) return
            loadedIcon = img
            imageLoadedTrigger.value++
          }
          return () => {
            aborted = true
          }
        }
      })
    })

    function drawCanvas (
      qr: qrcodegen.QrCode,
      size: number,
      foregroundColor: string,
      backgroundColor: string,
      iconConfig: {
        icon: HTMLImageElement
        iconBorderRadius: number
        iconSize: number
        iconBackgroundColor: string
      } | null
    ): void {
      const canvas = canvasRef.value
      if (!canvas) return
      const canvasWidth = size * UPSCALE_RATIO
      const width = qr.size
      const scale = canvasWidth / width
      canvas.width = canvasWidth
      canvas.height = canvasWidth
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
          ctx.fillStyle = qr.getModule(x, y) ? foregroundColor : backgroundColor
          const startX = Math.floor(x * scale)
          const endX = Math.ceil((x + 1) * scale)
          const startY = Math.floor(y * scale)
          const endY = Math.ceil((y + 1) * scale)
          ctx.fillRect(startX, startY, endX - startX, endY - startY)
        }
      }
      if (iconConfig) {
        const { icon, iconBackgroundColor, iconBorderRadius, iconSize } =
          iconConfig
        const finalIconSize = iconSize * UPSCALE_RATIO
        const centerX = (canvas.width - finalIconSize) / 2
        const centerY = (canvas.height - finalIconSize) / 2
        ctx.fillStyle = iconBackgroundColor
        ctx.beginPath()
        ctx.roundRect(
          centerX,
          centerY,
          finalIconSize,
          finalIconSize,
          iconBorderRadius * UPSCALE_RATIO
        )
        ctx.fill()
        const aspectRatio = icon.width / icon.height
        const scaledWidth =
          aspectRatio >= 1 ? finalIconSize : finalIconSize * aspectRatio
        const scaledHeight =
          aspectRatio <= 1 ? finalIconSize : finalIconSize / aspectRatio
        const left = centerX + (finalIconSize - scaledWidth) / 2
        const top = centerY + (finalIconSize - scaledHeight) / 2
        ctx.drawImage(icon, left, top, scaledWidth, scaledHeight)
      }
    }

    function generatePath (modules: Modules, margin: number = 0): string {
      const ops: string[] = []
      modules.forEach(function (row, y) {
        let start: number | null = null
        row.forEach(function (cell, x) {
          if (!cell && start !== null) {
            // M0 0h7v1H0z injects the space with the move and drops the comma,
            // saving a char per operation
            ops.push(
              `M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`
            )
            start = null
            return
          }

          // end of row, clean up or skip
          if (x === row.length - 1) {
            if (!cell) {
              // We would have closed the op above already so this can only mean
              // 2+ light modules in a row.
              return
            }
            if (start === null) {
              // Just a single dark module.
              ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`)
            } else {
              // Otherwise finish the current line.
              ops.push(
                `M${start + margin},${y + margin} h${x + 1 - start}v1H${
                  start + margin
                }z`
              )
            }
            return
          }

          if (cell && start === null) {
            start = x
          }
        })
      })
      return ops.join('')
    }

    function drawSvg (
      qr: qrcodegen.QrCode,
      size: number,
      iconConfig: {
        icon: HTMLImageElement
        iconBorderRadius: number
        iconSize: number
        iconBackgroundColor: string
      } | null
    ): void {
      const svg = svgRef.value
      if (!svg) return
      const cells = qr.getModules()
      const numCells = cells.length
      const cellsToDraw = cells

      svg.setAttribute('viewBox', `0 0 ${numCells} ${numCells}`)
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
      }

      const pathEle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      pathEle.setAttribute('fill', 'transparent')
      pathEle.setAttribute('d', `M0,0 h${numCells}v${numCells}H0z`)
      pathEle.setAttribute('shape-rendering', 'crispEdges')
      svg.appendChild(pathEle)

      const fgPath = generatePath(cellsToDraw, 0)
      const fgPathEle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      fgPathEle.setAttribute('fill', props.color)
      fgPathEle.setAttribute('d', fgPath)
      fgPathEle.setAttribute('shape-rendering', 'crispEdges')
      svg.appendChild(fgPathEle)

      if (iconConfig) {
        const { icon, iconSize } = iconConfig

        const DEFAULT_IMG_SCALE = 0.1
        const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE)
        const scale = numCells / size
        const h = (iconSize || defaultSize) * scale
        const w = (iconSize || defaultSize) * scale
        const x = cells.length / 2 - w / 2
        const y = cells.length / 2 - h / 2
        const image = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'image'
        )
        image.setAttribute('href', icon.src)
        image.setAttribute('width', w.toString())
        image.setAttribute('height', h.toString())
        image.setAttribute('x', x.toString())
        image.setAttribute('y', y.toString())
        image.setAttribute('preserveAspectRatio', 'none')
        svg.appendChild(image)
      }
    }

    return {
      canvasRef,
      svgRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass
    }
  },
  render () {
    const {
      mergedClsPrefix,
      backgroundColor,
      padding,
      cssVars,
      themeClass,
      size,
      type
    } = this

    return (
      <div
        class={[`${mergedClsPrefix}-qr-code`, themeClass]}
        style={{
          padding: typeof padding === 'number' ? `${padding}px` : padding,
          backgroundColor,
          width: `${size}px`,
          height: `${size}px`,
          ...cssVars
        }}
      >
        {type === 'canvas' ? (
          <canvas
            ref="canvasRef"
            style={{
              width: `${size}px`,
              height: `${size}px`
            }}
          />
        ) : (
          <svg ref="svgRef" height={size} width={size} role="img" />
        )}
      </div>
    )
  }
})
