import { h, computed, defineComponent, renderSlot, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-footer.cssr'

export default defineComponent({
  name: 'LayoutFooter',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    position: positionProp,
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Layout',
      'LayoutFooter',
      style,
      layoutLight,
      props
    )
    return {
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
    return (
      <div
        class={[
          'n-layout-footer',
          {
            [`n-layout-footer--${this.position}-positioned`]: this.position,
            'n-layout-footer--bordered': this.bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
