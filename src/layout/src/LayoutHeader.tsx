import {
  h,
  defineComponent,
  computed,
  CSSProperties,
  ExtractPropTypes
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-header.cssr'

const headerProps = {
  position: positionProp,
  bordered: {
    type: Boolean,
    default: false
  }
} as const

export type LayoutHeaderProps = ExtractPropTypes<typeof headerProps>

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...headerProps
  },
  setup (props) {
    const themeRef = useTheme(
      'Layout',
      'LayoutHeader',
      style,
      layoutLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { headerColor, headerBorderColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--header-color': headerColor,
          '--header-border-color': headerBorderColor
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-layout-header',
          this.position && `n-layout-header--${this.position}-positioned`,
          {
            'n-layout-header--bordered': this.bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
