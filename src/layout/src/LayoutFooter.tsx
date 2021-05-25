import { h, computed, defineComponent, CSSProperties } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-footer.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

const layoutFooterProps = {
  ...(useTheme.props as ThemeProps<LayoutTheme>),
  inverted: Boolean,
  position: positionProp,
  bordered: Boolean
}

export type LayoutFooterProps = ExtractPublicPropTypes<typeof layoutFooterProps>

export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutFooter',
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
          vars['--color'] = self.footerColorInverted
          vars['--text-color'] = self.textColorInverted
          vars['--border-color'] = self.footerBorderColorInverted
        } else {
          vars['--color'] = self.footerColor
          vars['--text-color'] = self.textColor
          vars['--border-color'] = self.footerBorderColor
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
          `${mergedClsPrefix}-layout-footer`,
          this.position &&
            `${mergedClsPrefix}-layout-footer--${this.position}-positioned`,
          this.bordered && `${mergedClsPrefix}-layout-footer--bordered`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
