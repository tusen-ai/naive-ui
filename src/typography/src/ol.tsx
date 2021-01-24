import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/list.cssr'

export default defineComponent({
  name: 'Ol',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>),
    alignText: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Typography',
      'Ol&Ul',
      style,
      typographyLight,
      props
    )
    return {
      cssVars: computed(() => {
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
          '--bezier': cubicBezierEaseInOut,
          '--font-size': liFontSize,
          '--line-height': liLineHeight,
          '--text-color': liTextColor,
          '--li-margin': liMargin,
          '--ol-padding': olPadding,
          '--ul-padding': ulPadding
        }
      })
    }
  },
  render () {
    return (
      <ol
        class={[
          'n-ol',
          {
            'n-ol--align-text': this.alignText
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </ol>
    )
  }
})
