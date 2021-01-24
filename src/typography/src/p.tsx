import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/p.cssr'

export default defineComponent({
  name: 'P',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>),
    depth: {
      type: String as PropType<1 | 2 | 3 | '1' | '2' | '3' | undefined>,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Typography', 'P', style, typographyLight, props)
    return {
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
            [`pTextColor${typeSafeDepth}Depth` as `pTextColor${typeof typeSafeDepth}Depth`]: depthTextColor
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
      <p class="n-p" style={this.cssVars as CSSProperties}>
        {this.$slots}
      </p>
    )
  }
})
