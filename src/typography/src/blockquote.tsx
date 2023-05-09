import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import style from './styles/blockquote.cssr'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'

export const blockquoteProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  alignText: Boolean
} as const

export type BlockquoteProps = ExtractPublicPropTypes<typeof blockquoteProps>

export default defineComponent({
  name: 'Blockquote',
  props: blockquoteProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-blockquote',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          blockquoteTextColor,
          blockquotePrefixColor,
          blockquoteLineHeight,
          blockquoteFontSize
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': blockquoteFontSize,
        '--n-line-height': blockquoteLineHeight,
        '--n-prefix-color': blockquotePrefixColor,
        '--n-text-color': blockquoteTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('blockquote', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <blockquote
        class={[
          `${mergedClsPrefix}-blockquote`,
          this.themeClass,
          this.alignText && `${mergedClsPrefix}-blockquote--align-text`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </blockquote>
    )
  }
})
