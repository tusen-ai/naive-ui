import {
  computed,
  h,
  defineComponent,
  mergeProps,
  PropType,
  watchEffect
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { warnOnce } from '../../_utils'
import type { CollapseTransitionTheme } from '../styles'
import style from './styles/index.cssr'
import { collapseTransitionLight } from '../styles'
import { NFadeInExpandTransition } from '../../_internal'

const collapseProps = {
  ...(useTheme.props as ThemeProps<CollapseTransitionTheme>),
  show: {
    type: Boolean,
    default: true
  },
  appear: Boolean,
  // The collapsed is implemented will mistake, collapsed=true would make it show
  // However there's no possibility to change so I just let it deprecated and use
  // `show` prop instead.
  /** @deprecated */
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export type CollapseTransitionProps = ExtractPublicPropTypes<
  typeof collapseProps
>

export default defineComponent({
  name: 'CollapseTransition',
  props: collapseProps,
  inheritAttrs: false,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.collapsed !== undefined) {
          warnOnce(
            'collapse-transition',
            '`collapsed` is deprecated, please use `show` instead'
          )
        }
      })
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const mergedThemeRef = useTheme(
      'CollapseTransition',
      'CollapseTransition',
      style,
      collapseTransitionLight,
      props
    )
    const mergedShowRef = computed(() => {
      if (props.collapsed !== undefined) {
        // No mistake, it's implemented with error at first, just keep it here
        return props.collapsed
      }
      return props.show
    })
    return {
      mergedShow: mergedShowRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          self: { bezier }
        } = mergedThemeRef.value
        return {
          '--n-bezier': bezier
        }
      })
    }
  },
  render () {
    return (
      <NFadeInExpandTransition appear={this.appear}>
        {{
          default: () =>
            this.mergedShow
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
