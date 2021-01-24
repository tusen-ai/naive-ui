import { h, computed, defineComponent, CSSProperties, provide } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { breadcrumbLight } from '../styles'
import type { BreadcrumbTheme } from '../styles'
import style from './styles/index.cssr'

export interface BreadcrumbInjection {
  separator: string
}

export default defineComponent({
  name: 'Breadcrumb',
  props: {
    ...(useTheme.props as ThemeProps<BreadcrumbTheme>),
    separator: {
      type: String,
      default: '/'
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Breadcrumb',
      'Breadcrumb',
      style,
      breadcrumbLight,
      props
    )
    provide<BreadcrumbInjection>('NBreadcrumb', props)
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            separatorColor,
            itemTextColor,
            itemTextColorHover,
            itemTextColorPressed,
            itemTextColorActive,
            fontSize,
            fontWeightActive
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--item-text-color': itemTextColor,
          '--item-text-color-hover': itemTextColorHover,
          '--item-text-color-pressed': itemTextColorPressed,
          '--item-text-color-active': itemTextColorActive,
          '--separator-color': separatorColor,
          '--font-weight-active': fontWeightActive
        }
      })
    }
  },
  render () {
    return (
      <div class="n-breadcrumb" style={this.cssVars as CSSProperties}>
        {this.$slots}
      </div>
    )
  }
})
