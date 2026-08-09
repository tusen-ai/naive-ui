import type { PropType } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { ButtonSize } from '../../button/src/public-types'
import { defineComponent, h, provide } from 'vue'
import { useConfig, useStyle } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import { buttonGroupInjectionKey } from './context'
import style from './styles/index.cssr'

export interface ButtonGroupInjection {
  size?: ButtonSize | undefined
}

export const buttonGroupProps = {
  size: String as PropType<ButtonSize | undefined>,
  vertical: Boolean
} as const

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export default defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  setup(props) {
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
  render() {
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
        {this.$slots.default?.()}
      </div>
    )
  }
})
