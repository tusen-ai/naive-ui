import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/p.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

const pProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  depth: String as PropType<1 | 2 | 3 | '1' | '2' | '3' | undefined>
}

export type PProps = ExtractPublicPropTypes<typeof pProps>

export default defineComponent({
  name: 'P',
  props: pProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'P',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const { depth } = props
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
          '--bezier': cubicBezierEaseInOut,
          '--font-size': pFontSize,
          '--line-height': pLineHeight,
          '--margin': pMargin,
          '--text-color': depth === undefined ? pTextColor : depthTextColor
        }
      })
    }
  },
  render () {
    return (
      <p
        class={`${this.mergedClsPrefix}-p`}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </p>
    )
  }
})
