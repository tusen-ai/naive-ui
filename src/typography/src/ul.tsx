import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { TypographyTheme } from '../styles'
import { computed, type CSSProperties, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { typographyLight } from '../styles'
import style from './styles/list.cssr'

export const ulProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  alignText: Boolean
} as const

export type UlProps = ExtractPublicPropTypes<typeof ulProps>

export default defineComponent({
  name: 'Ul',
  props: ulProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-xl',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          olPadding,
          ulPadding,
          liMargin,
          liTextColor,
          liLineHeight,
          liFontSize
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': liFontSize,
        '--n-line-height': liLineHeight,
        '--n-text-color': liTextColor,
        '--n-li-margin': liMargin,
        '--n-ol-padding': olPadding,
        '--n-ul-padding': ulPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('ul', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <ul
        class={[
          `${mergedClsPrefix}-ul`,
          this.themeClass,
          this.alignText && `${mergedClsPrefix}-ul--align-text`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </ul>
    )
  }
})
