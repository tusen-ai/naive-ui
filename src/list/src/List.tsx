import {
  computed,
  defineComponent,
  h,
  renderSlot,
  PropType,
  CSSProperties
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { listLight } from '../styles'
import type { ListTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'List',
  props: {
    ...(useTheme.props as ThemeProps<ListTheme>),
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('List', 'List', style, listLight, props)
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            textColor,
            color,
            colorModal,
            borderColor,
            borderRadius
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--color': color,
          '--border-radius': borderRadius,
          '--border-color': borderColor,
          '--color-modal': colorModal
        }
      })
    }
  },
  render () {
    const { $slots } = this
    return (
      <ul
        class={[
          'n-list',
          {
            'n-list--bordered': this.bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {$slots.header ? (
          <div class="n-list__header">{renderSlot($slots, 'header')}</div>
        ) : null}
        {renderSlot($slots, 'default')}
        {$slots.footer ? (
          <div v-if="$slots.footer" class="n-list__footer">
            {renderSlot($slots, 'footer')}
          </div>
        ) : null}
      </ul>
    )
  }
})
