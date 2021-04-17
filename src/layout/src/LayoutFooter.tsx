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
  position: positionProp,
  bordered: {
    type: Boolean,
    default: false
  }
}

export type LayoutFooterProps = ExtractPublicPropTypes<typeof layoutFooterProps>

export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutFooter',
      style,
      layoutLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { footerBorderColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--footer-border-color': footerBorderColor
        }
      })
    }
  },
  render () {
    const { cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-layout-footer`,
          {
            [`${cPrefix}-layout-footer--${this.position}-positioned`]: this
              .position,
            [`${cPrefix}-layout-footer--bordered`]: this.bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
