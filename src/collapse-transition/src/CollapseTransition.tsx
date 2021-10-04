import { computed, h, defineComponent, mergeProps } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import type { CollapseTransitionTheme } from '../styles'
import style from './styles/index.cssr'
import { collapseTransitionLight } from '../styles'
import { NFadeInExpandTransition } from '../../_internal'

const collapseProps = {
  ...(useTheme.props as ThemeProps<CollapseTransitionTheme>),
  collapsed: Boolean,
  appear: Boolean
} as const

export type CollapseProps = ExtractPublicPropTypes<typeof collapseProps>

export default defineComponent({
  name: 'CollapseTransition',
  props: collapseProps,
  inheritAttrs: false,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const mergedThemeRef = useTheme(
      'CollapseTransition',
      'CollapseTransition',
      style,
      collapseTransitionLight,
      props
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          self: { bezier }
        } = mergedThemeRef.value
        return {
          '--bezier': bezier
        }
      })
    }
  },
  render () {
    return (
      <NFadeInExpandTransition appear={this.appear}>
        {{
          default: () =>
            this.collapsed
              ? h(
                'div', // Don't use jsx since it would cause useless spread in each rendering
                mergeProps(
                  {
                    class: `${this.mergedClsPrefix}-collapse-transition`,
                    style: this.cssVars
                  },
                  this.$attrs
                ),
                this.$slots
              )
              : null
        }}
      </NFadeInExpandTransition>
    )
  }
})
