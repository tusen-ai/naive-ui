import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { TypographyTheme } from '../styles'
import { computed, type CSSProperties, defineComponent, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import { typographyLight } from '../styles'
import style from './styles/a.cssr'

export const aProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>)
} as const

export type AProps = ExtractPublicPropTypes<typeof aProps>

export default defineComponent({
  name: 'A',
  props: aProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-a',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { aTextColor }
      } = themeRef.value
      return {
        '--n-text-color': aTextColor,
        '--n-bezier': cubicBezierEaseInOut
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('a', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    this.onRender?.()
    return (
      <a
        class={[`${this.mergedClsPrefix}-a`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </a>
    )
  }
})
