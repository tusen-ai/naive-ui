import { h, PropType, defineComponent, provide, InjectionKey } from 'vue'
import { useConfig, useStyle } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { Size } from './interface'
import style from './styles/button-group.cssr'

export interface ButtonGroupInjection {
  size?: Size | undefined
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupInjection> = Symbol(
  'button-group'
)

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
    const { mergedClsPrefix } = useConfig(props)
    useStyle('ButtonGroup', style, mergedClsPrefix)
    provide(buttonGroupInjectionKey, props)
    return {
      cPrefix: mergedClsPrefix
    }
  },
  render () {
    const { cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-button-group`,
          {
            [`${cPrefix}-button-group--vertical`]: this.vertical
          }
        ]}
      >
        {this.$slots}
      </div>
    )
  }
})
