import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
  CSSProperties,
  PropType,
  h,
  renderSlot,
  watchEffect
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { countdownLight } from '../styles'
import type { CountdownTheme } from '../styles'
import style from './styles/index.cssr'
import { differenceInMilliseconds } from 'date-fns'
import { getTimeString } from './utils'

const countdownProps = {
  ...(useTheme.props as ThemeProps<CountdownTheme>),
  label: String,
  value: {
    type: Number,
    default: () => Date.now()
  },
  valueStyle: [Object, String] as PropType<undefined | string | CSSProperties>,
  start: {
    type: Boolean,
    default: true
  },
  now: {
    type: Number,
    default: () => Date.now()
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  onFinish: Function as PropType<() => void>
}

export type CountdownProps = ExtractPublicPropTypes<typeof countdownProps>

export default defineComponent({
  name: 'Countdown',
  props: countdownProps,
  setup (props) {
    const REFRESH_INTERVAL = 1000 / 30
    const displayValueRef = ref(
      getTimeString(
        Math.max(differenceInMilliseconds(props.value, props.now), 0),
        props.format
      )
    )
    const timerRef = ref(0)
    const startTimer = (): void => {
      if (props.value <= props.now) return
      timerRef.value = window.setInterval(() => {
        const diff = differenceInMilliseconds(props.value, Date.now())
        if (diff <= 0) {
          stopTimer()
          props.onFinish?.()
        }
        displayValueRef.value = getTimeString(Math.max(diff, 0), props.format)
      }, REFRESH_INTERVAL)
    }
    const stopTimer = (): void => {
      if (timerRef.value) {
        window.clearInterval(timerRef.value)
        timerRef.value = 0
      }
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.start && !timerRef.value) {
          startTimer()
        } else {
          stopTimer()
        }
      })
    })
    onBeforeUnmount(() => {
      stopTimer()
    })
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Countdown',
      'Countdown',
      style,
      countdownLight,
      props,
      mergedClsPrefixRef
    )
    return {
      displayValue: displayValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          self: {
            labelFontWeight,
            valueFontWeight,
            valuePrefixTextColor,
            labelTextColor,
            valueTextColor,
            labelFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-label-font-size': labelFontSize,
          '--n-label-font-weight': labelFontWeight,
          '--n-label-text-color': labelTextColor,
          '--n-value-font-weight': valueFontWeight,
          '--n-value-prefix-text-color': valuePrefixTextColor,
          '--n-value-text-color': valueTextColor
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-countdown`}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-countdown__label`}>
          {this.label || $slots.label?.()}
        </div>
        <div class={`${mergedClsPrefix}-countdown-value`}>
          {$slots.prefix ? (
            <span class={`${mergedClsPrefix}-countdown-value__prefix`}>
              {renderSlot($slots, 'prefix')}
            </span>
          ) : null}
          <span class={`${mergedClsPrefix}-countdown-value__content`}>
            {this.displayValue}
          </span>
        </div>
      </div>
    )
  }
})
