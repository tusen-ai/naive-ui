import {
  computed,
  h,
  defineComponent,
  mergeProps,
  type PropType,
  watchEffect
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { warnOnce } from '../../_utils'
import type { CollapseTransitionTheme } from '../styles'
import style from './styles/index.cssr'
import { collapseTransitionLight } from '../styles'
import { NFadeInExpandTransition } from '../../_internal'

export const collapseTransitionProps = {
  ...(useTheme.props as ThemeProps<CollapseTransitionTheme>),
  show: {
    type: Boolean,
    default: true
  },
  appear: Boolean,
  // The collapsed is implemented with mistake, collapsed=true would make it show
  // However there's no possibility to change so I just let it deprecated and use
  // `show` prop instead.
  /** @deprecated */
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export type CollapseTransitionProps = ExtractPublicPropTypes<
  typeof collapseTransitionProps
>

export default defineComponent({
  name: 'CollapseTransition',
  props: collapseTransitionProps,
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
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const mergedThemeRef = useTheme(
      'CollapseTransition',
      '-collapse-transition',
      style,
      collapseTransitionLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl(
      'CollapseTransition',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const mergedShowRef = computed(() => {
      if (props.collapsed !== undefined) {
        // No mistake, it's implemented with error at first, just keep it here
        return props.collapsed
      }
      return props.show
    })

    const cssVarsRef = computed(() => {
      const {
        self: { bezier }
      } = mergedThemeRef.value
      return {
        '--n-bezier': bezier
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('collapse-transition', undefined, cssVarsRef, props)
      : undefined

    return {
      rtlEnabled: rtlEnabledRef,
      mergedShow: mergedShowRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    return (
      <NFadeInExpandTransition appear={this.appear}>
        {{
          default: () => {
            if (!this.mergedShow) return
            this.onRender?.()
            return h(
              'div', // Don't use jsx since it would cause useless spread in each rendering
              mergeProps(
                {
                  class: [
                    `${this.mergedClsPrefix}-collapse-transition`,
                    this.rtlEnabled &&
                      `${this.mergedClsPrefix}-collapse-transition--rtl`,
                    this.themeClass
                  ],
                  style: this.cssVars
                },
                this.$attrs
              ),
              this.$slots
            )
          }
        }}
      </NFadeInExpandTransition>
    )
  }
})
