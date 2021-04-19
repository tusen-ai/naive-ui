import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import style from './styles/blockquote.cssr'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'

const blockquoteProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  alignText: {
    type: Boolean,
    default: false
  }
} as const

export type BlockquoteProps = ExtractPublicPropTypes<typeof blockquoteProps>

export default defineComponent({
  name: 'Blockquote',
  props: blockquoteProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'Blockquote',
      style,
      typographyLight,
      props,
      mergedClsPrefix
    )
    return {
      mergedClsPrefix,
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
    const { mergedClsPrefix } = this
    return (
      <blockquote
        class={[
          `${mergedClsPrefix}-blockquote`,
          this.alignText && `${mergedClsPrefix}-blockquote--align-text`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </blockquote>
    )
  }
})
