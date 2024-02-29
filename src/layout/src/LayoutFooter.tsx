import { h, computed, defineComponent } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-footer.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

export const layoutFooterProps = {
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
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      '-layout-footer',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const vars: any = {
        '--n-bezier': cubicBezierEaseInOut
      }
      if (props.inverted) {
        vars['--n-color'] = self.footerColorInverted
        vars['--n-text-color'] = self.textColorInverted
        vars['--n-border-color'] = self.footerBorderColorInverted
      } else {
        vars['--n-color'] = self.footerColor
        vars['--n-text-color'] = self.textColor
        vars['--n-border-color'] = self.footerBorderColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'layout-footer',
        computed(() => (props.inverted ? 'a' : 'b')),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-layout-footer`,
          this.themeClass,
          this.position &&
            `${mergedClsPrefix}-layout-footer--${this.position}-positioned`,
          this.bordered && `${mergedClsPrefix}-layout-footer--bordered`
        ]}
        style={this.cssVars}
      >
        {this.$slots}
      </div>
    )
  }
})
