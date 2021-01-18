import { h, renderSlot, defineComponent, computed, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import style from './styles/blockquote.cssr'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'

export default defineComponent({
  name: 'Blockquote',
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
      'Blockquote',
      style,
      typographyLight,
      props
    )
    return {
      cssVars: computed(() => {
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
          '--bezier': cubicBezierEaseInOut,
          '--font-size': blockquoteFontSize,
          '--line-height': blockquoteLineHeight,
          '--prefix-color': blockquotePrefixColor,
          '--text-color': blockquoteTextColor
        }
      })
    }
  },
  render () {
    return (
      <blockquote
        class={[
          'n-blockquote',
          {
            'n-blockquote--align-text': this.alignText
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {renderSlot(this.$slots, 'default')}
      </blockquote>
    )
  }
})
