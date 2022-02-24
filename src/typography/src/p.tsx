import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/p.cssr'
import { color2Class, ExtractPublicPropTypes } from '../../_utils'

const pProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  depth: [String, Number] as PropType<1 | 2 | 3 | '1' | '2' | '3'>,
  color: String
}

export type PProps = ExtractPublicPropTypes<typeof pProps>

export default defineComponent({
  name: 'P',
  props: pProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-p',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { depth, color } = props
      const typeSafeDepth = depth || '1'
      const {
        common: { cubicBezierEaseInOut },
        self: {
          pFontSize,
          pLineHeight,
          pMargin,
          pTextColor,
          [`pTextColor${typeSafeDepth}Depth` as const]: depthTextColor
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': pFontSize,
        '--n-line-height': pLineHeight,
        '--n-margin': pMargin,
        '--n-text-color':
          color ?? depth === undefined ? pTextColor : depthTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'p',
        computed(() => {
          let hash = `${props.depth || ''}`
          const { color } = props

          if (color) hash += 'a' + color2Class(color)

          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    this.onRender?.()
    return (
      <p
        class={[`${this.mergedClsPrefix}-p`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </p>
    )
  }
})
