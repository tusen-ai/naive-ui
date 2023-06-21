import { h, ref, defineComponent, watchEffect } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import QRCode from 'qrcode'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { type QrcodeTheme, qrcodeLight } from '../styles'

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
  width: {
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

    const src = ref('')

    watchEffect(async () => {
      src.value = await QRCode.toDataURL(props.value || '-', {
        width: props.width,
        margin: 0,
        color: {
          dark: props.color,
          light: props.bgColor
        }
      })
    })

    return {
      src,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { src, mergedClsPrefix, bordered, bgColor } = this
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
          <img src={src} />
        </div>
      </div>
    )
  }
})
