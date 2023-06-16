import { h, watch, ref, defineComponent } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import QRCode from 'qrcode'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'
import { type QrcodeTheme, qrcodeLight } from '../styles'

export const qrcodeProps = {
  ...(useTheme.props as ThemeProps<QrcodeTheme>),
  value: String,
  bordered: {
    type: Boolean,
    default: true as boolean
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

    const generateQRcode = async (): Promise<void> => {
      src.value = await QRCode.toDataURL(props.value || '-', {
        width: props.width,
        margin: 0
      })
    }

    watch(
      props,
      async () => {
        await generateQRcode()
      },
      { immediate: true }
    )

    return {
      src,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { src, mergedClsPrefix, bordered } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-qrcode`,
          { [`${mergedClsPrefix}-qrcode--bordered`]: bordered }
        ]}
      >
        <div class={`${mergedClsPrefix}-qrcode-wrapper`}>
          <img src={src} />
        </div>
      </div>
    )
  }
})
