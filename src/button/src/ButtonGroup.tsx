import { h, PropType, defineComponent, provide } from 'vue'
import { useConfig, useStyle } from '../../_mixins'
import { createInjectionKey, ExtractPublicPropTypes } from '../../_utils'
import type { Size } from './interface'
import style from './styles/button-group.cssr'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export const buttonGroupInjectionKey =
  createInjectionKey<ButtonGroupInjection>('n-button-group')

const buttonGroupProps = {
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
    const { mergedClsPrefixRef } = useConfig(props)
    useStyle('-button-group', style, mergedClsPrefixRef)
    provide(buttonGroupInjectionKey, props)
    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-button-group`,
          this.vertical && `${mergedClsPrefix}-button-group--vertical`
        ]}
        role="group"
      >
        {this.$slots}
      </div>
    )
  }
})
