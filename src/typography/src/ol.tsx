import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/list.cssr'

const olProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  alignText: {
    type: Boolean,
    default: false
  }
}

export type OlProps = ExtractPublicPropTypes<typeof olProps>

export default defineComponent({
  name: 'Ol',
  props: olProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'Ol&Ul',
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
    const { mergedClsPrefix } = this
    return (
      <ol
        class={[
          `${mergedClsPrefix}-ol`,
          this.alignText && `${mergedClsPrefix}-ol--align-text`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </ol>
    )
  }
})
