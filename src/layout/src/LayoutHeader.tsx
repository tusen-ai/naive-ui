import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-header.cssr'
import { ExtractPublicPropTypes } from '../../_utils'

const headerProps = {
  position: positionProp,
  inverted: Boolean,
  bordered: {
    type: Boolean,
    default: false
  }
} as const

export type LayoutHeaderProps = ExtractPublicPropTypes<typeof headerProps>

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...headerProps
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutHeader',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        const vars: any = {
          '--bezier': cubicBezierEaseInOut
        }
        if (props.inverted) {
          vars['--color'] = self.headerColorInverted
          vars['--text-color'] = self.textColorInverted
          vars['--border-color'] = self.headerBorderColorInverted
        } else {
          vars['--color'] = self.headerColor
          vars['--text-color'] = self.textColor
          vars['--border-color'] = self.headerBorderColor
        }
        return vars
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-layout-header`,
          this.position &&
            `${mergedClsPrefix}-layout-header--${this.position}-positioned`,
          this.bordered && `${mergedClsPrefix}-layout-header--bordered`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
