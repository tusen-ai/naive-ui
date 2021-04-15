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
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NBaseSlotMachine, NBaseWave } from '../../_internal'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { badgeLight } from '../styles'
import type { BadgeTheme } from '../styles'
import style from './styles/index.cssr'

const badgeProps = {
  ...(useTheme.props as ThemeProps<BadgeTheme>),
  value: [String, Number] as PropType<string | number>,
  max: Number,
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
  color: String
} as const

export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>

export default defineComponent({
  name: 'Badge',
  props: badgeProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Badge',
      'Badge',
      style,
      badgeLight,
      props,
      mergedClsPrefix
    )
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
      cPrefix: mergedClsPrefix,
      appeared: ref(false),
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
    const { cPrefix } = this
    return (
      <div
        class={[
          `${cPrefix}-badge`,
          {
            [`${cPrefix}-badge--dot`]: this.dot,
            [`${cPrefix}-badge--as-is`]: !this.$slots.default
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
                <sup class={`${cPrefix}-badge-sup`}>
                  {!this.dot ? (
                    <NBaseSlotMachine
                      clsPrefix={cPrefix}
                      appeared={this.appeared}
                      max={this.max}
                      value={this.value}
                    />
                  ) : null}
                  {this.processing ? <NBaseWave clsPrefix={cPrefix} /> : null}
                </sup>
              ) : null
          }}
        </Transition>
      </div>
    )
  }
})
