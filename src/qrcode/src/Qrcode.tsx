import { h, ref, defineComponent, watchEffect } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { type QrcodeTheme, qrcodeLight } from '../styles'
import qrcodegen from './qrcodegen'

export const qrcodeProps = {
  ...(useTheme.props as ThemeProps<QrcodeTheme>),
  value: String,
  color: {
    type: String,
    default: '#000'
  },
  bgColor: {
    type: String,
    default: '#FFF'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  size: {
    type: Number,
    default: 110
  }
} as const

export type QrcodeProps = ExtractPublicPropTypes<typeof qrcodeProps>

export default defineComponent({
  name: 'Qrcode',
  props: qrcodeProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)

    useTheme('Qrcode', '-qrcode', style, qrcodeLight, props, mergedClsPrefixRef)

    const canvasRef = ref<HTMLCanvasElement>()

    watchEffect(() => {
      const errCorLvl = qrcodegen.QrCode.Ecc.LOW
      const qr = qrcodegen.QrCode.encodeText(props.value ?? '-', errCorLvl)
      drawCanvas(qr, props.size, props.color, props.bgColor)
    })

    function drawCanvas (
      qr: qrcodegen.QrCode,
      size: number,
      darkColor: string,
      lightColor: string
    ): void {
      const canvas = canvasRef.value
      if (!canvas) return
      const canvasWidth = size
      const width = qr.size
      const scale = canvasWidth / width
      canvas.width = canvasWidth
      canvas.height = canvasWidth
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      for (let y = 0; y < qr.size; y++) {
        for (let x = 0; x < qr.size; x++) {
          ctx.fillStyle = qr.getModule(x, y) ? darkColor : lightColor
          const startX = Math.floor(x * scale)
          const endX = Math.ceil((x + 1) * scale)
          const startY = Math.floor(y * scale)
          const endY = Math.ceil((y + 1) * scale)
          ctx.fillRect(startX, startY, endX - startX, endY - startY)
        }
      }
    }

    return {
      canvasRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix, bordered, bgColor } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-qrcode`,
          { [`${mergedClsPrefix}-qrcode--bordered`]: bordered }
        ]}
      >
        <div
          class={[`${mergedClsPrefix}-qrcode-wrapper`]}
          style={{ backgroundColor: bgColor }}
        >
          <canvas ref="canvasRef"></canvas>
        </div>
      </div>
    )
  }
})
