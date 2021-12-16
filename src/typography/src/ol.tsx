import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/list.cssr'

const olProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  alignText: Boolean
}

export type OlProps = ExtractPublicPropTypes<typeof olProps>

export default defineComponent({
  name: 'Ol',
  props: olProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'Ol&Ul',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
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
          '--n-bezier': cubicBezierEaseInOut,
          '--n-font-size': liFontSize,
          '--n-line-height': liLineHeight,
          '--n-text-color': liTextColor,
          '--n-li-margin': liMargin,
          '--n-ol-padding': olPadding,
          '--n-ul-padding': ulPadding
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
