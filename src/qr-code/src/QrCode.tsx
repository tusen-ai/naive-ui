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

    return {
      canvasRef,
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
      size
    } = this
    return (
      <div
        class={[`${mergedClsPrefix}-qr-code`, themeClass]}
        style={{
          padding: typeof padding === 'number' ? `${padding}px` : padding,
          backgroundColor,
          ...cssVars
        }}
      >
        <canvas
          ref="canvasRef"
          style={{
            width: `${size}px`,
            height: `${size}px`
          }}
        />
      </div>
    )
  }
})
