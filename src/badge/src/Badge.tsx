import {
  h,
  computed,
  onMounted,
  ref,
  PropType,
  defineComponent,
  renderSlot,
  Transition,
  CSSProperties
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NBaseSlotMachine, NBaseWave } from '../../_internal'
import { createKey } from '../../_utils'
import { badgeLight } from '../styles'
import type { BadgeTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Badge',
  props: {
    ...(useTheme.props as ThemeProps<BadgeTheme>),
    value: {
      type: [String, Number],
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    dot: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<
      'success' | 'error' | 'warning' | 'info' | 'default'
      >,
      default: 'default'
    },
    show: {
      type: Boolean,
      default: true
    },
    showZero: {
      type: Boolean,
      default: false
    },
    processing: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Badge', 'Badge', style, badgeLight, props)
    const appearedRef = ref(false)
    const handleAfterEnter = (): void => {
      appearedRef.value = true
    }
    const handleAfterLeave = (): void => {
      appearedRef.value = false
    }
    const showBadgeRef = computed(() => {
      return (
        props.show &&
        (props.dot ||
          (props.value !== undefined && !(!props.showZero && props.value <= 0)))
      )
    })
    onMounted(() => {
      if (showBadgeRef.value) appearedRef.value = true
    })
    return {
      appeared: ref(false),
      number: computed(() => {
        const { max, value } = props
        return max === undefined || typeof value === 'string'
          ? value
          : value > max
            ? `${max}+`
            : value
      }),
      showBadge: showBadgeRef,
      handleAfterEnter,
      handleAfterLeave,
      cssVars: computed(() => {
        const { type, color: propColor } = props
        const {
          common: { cubicBezierEaseInOut, cubicBezierEaseOut },
          self: { [createKey('color', type)]: color, fontFamily, fontSize }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--font-family': fontFamily,
          '--color': propColor || color,
          '--ripple-color': propColor || color,
          '--bezier': cubicBezierEaseInOut,
          '--ripple-bezier': cubicBezierEaseOut
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-badge',
          {
            'n-badge--dot': this.dot,
            'n-badge--as-is': !this.$slots.default
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {renderSlot(this.$slots, 'default')}
        <Transition
          name="n-fade-in-scale-up-transition"
          onAfterEnter={this.handleAfterEnter}
          onAfterLeave={this.handleAfterLeave}
        >
          {{
            default: () =>
              this.showBadge ? (
                <sup class="n-badge-sup">
                  {!this.dot ? (
                    <NBaseSlotMachine
                      appeared={this.appeared}
                      max={this.max}
                      value={this.value}
                    />
                  ) : null}
                  {this.processing ? <NBaseWave /> : null}
                </sup>
              ) : null
          }}
        </Transition>
      </div>
    )
  }
})
