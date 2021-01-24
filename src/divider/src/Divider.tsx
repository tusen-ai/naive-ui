import {
  h,
  computed,
  defineComponent,
  CSSProperties,
  PropType,
  Fragment
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { dividerLight } from '../styles'
import type { DividerTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Divider',
  props: {
    ...(useTheme.props as ThemeProps<DividerTheme>),
    titlePlacement: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'center'
    },
    dashed: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('Divider', 'Divider', style, dividerLight, props)
    return {
      ...useConfig(props),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor, fontWeight }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor,
          '--font-weight': fontWeight
        }
      })
    }
  },
  render () {
    const { $slots, titlePlacement, vertical, dashed, cssVars } = this
    return (
      <div
        class={[
          'n-divider',
          {
            'n-divider--vertical': vertical,
            'n-divider--no-title': !$slots.default,
            'n-divider--dashed': dashed,
            [`n-divider--title-position-${titlePlacement}`]:
              $slots.default && titlePlacement
          }
        ]}
        style={cssVars as CSSProperties}
      >
        {!vertical ? (
          <hr class="n-divider__line n-divider__line--left" />
        ) : null}
        {!vertical && $slots.default ? (
          <>
            <div class="n-divider__title">{this.$slots}</div>
            <div class="n-divider__line n-divider__line--right" />
          </>
        ) : null}
      </div>
    )
  }
})
