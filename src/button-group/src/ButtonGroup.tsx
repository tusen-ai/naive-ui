import { h, type PropType, defineComponent, provide } from 'vue'
import type { Size } from '../../button/src/interface'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { buttonGroupInjectionKey } from './context'
import style from './styles/index.cssr'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export const buttonGroupProps = {
  size: {
    type: String as PropType<Size | undefined>,
    default: undefined
  },
  vertical: Boolean
} as const

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export default defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    useStyle('-button-group', style, mergedClsPrefixRef)
    provide(buttonGroupInjectionKey, props)
    const rtlEnabledRef = useRtl(
      'ButtonGroup',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-button-group`,
          this.rtlEnabled && `${mergedClsPrefix}-button-group--rtl`,
          this.vertical && `${mergedClsPrefix}-button-group--vertical`
        ]}
        role="group"
      >
        {this.$slots}
      </div>
    )
  }
})
