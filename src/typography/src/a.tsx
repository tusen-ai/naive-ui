import { h, defineComponent, computed, CSSProperties, PropType } from 'vue'
import { RouteLocationRaw, RouterLink } from 'vue-router'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/a.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

const aProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  to: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: null
  }
} as const

export type AProps = ExtractPublicPropTypes<typeof aProps>

export default defineComponent({
  name: 'A',
  props: aProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      'A',
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
          self: { aTextColor }
        } = themeRef.value
        return {
          '--text-color': aTextColor,
          '--bezier': cubicBezierEaseInOut
        }
      })
    }
  },
  render () {
    if (this.to) {
      return (
        <RouterLink
          class={`${this.mergedClsPrefix}-a`}
          to={this.to}
          style={this.cssVars as CSSProperties}
        >
          {this.$slots}
        </RouterLink>
      )
    }
    return (
      <a
        class={`${this.mergedClsPrefix}-a`}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </a>
    )
  }
})
