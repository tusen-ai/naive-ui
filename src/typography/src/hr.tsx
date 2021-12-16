import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/hr.cssr'

export default defineComponent({
  name: 'Hr',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>)
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'Hr',
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
          self: { hrColor }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color': hrColor
        }
      })
    }
  },
  render () {
    return (
      <hr
        class={`${this.mergedClsPrefix}-hr`}
        style={this.cssVars as CSSProperties}
      />
    )
  }
})
