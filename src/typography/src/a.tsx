import {
  h,
  defineComponent,
  computed,
  resolveComponent,
  renderSlot,
  CSSProperties
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/a.cssr'

export default defineComponent({
  name: 'A',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>),
    to: {
      type: [String, Object],
      default: null
    }
  },
  setup (props) {
    const themeRef = useTheme('Typography', 'A', style, typographyLight, props)
    return {
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
    const RouterLink = resolveComponent('router-link')
    if (RouterLink && this.to) {
      return h(
        RouterLink as any,
        {
          class: 'n-a',
          to: this.to,
          style: this.cssVars
        },
        {
          default: () => renderSlot(this.$slots, 'default')
        }
      )
    }
    return (
      <a class="n-a" style={this.cssVars as CSSProperties}>
        {renderSlot(this.$slots, 'default')}
      </a>
    )
  }
})
