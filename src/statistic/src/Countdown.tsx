import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  ref,
  toRef,
  CSSProperties,
  PropType,
  h
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { statisticLight } from '../styles'
import type { StatisticTheme } from '../styles'
import style from './styles/index.cssr'
import { differenceInMilliseconds } from 'date-fns'
import { getTimeString } from './utils'

const countdownProps = {
  ...(useTheme.props as ThemeProps<StatisticTheme>),
  lable: String,
  value: {
    type: Number,
    default: () => Date.now() + 300000
  },
  valueStyle: {
    type: [Object, String] as PropType<undefined | string | CSSProperties>,
    default: undefined
  },
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
  onChange: Function as PropType<(value: number) => void>,
  onFinish: Function as PropType<() => void>
}

export type CountdownProps = ExtractPublicPropTypes<typeof countdownProps>

export default defineComponent({
  name: 'Countdown',
  props: countdownProps,
  setup (props) {
    const REFRESH_INTERVAL = 1000 / 30
    const start = toRef(props, 'start')
    const displayValueRef = ref(
      getTimeString(
        Math.max(
          differenceInMilliseconds(new Date(props.value), new Date(props.now)),
          0
        ),
        props.format
      )
    )
    const timerRef = ref(0)
    const startTimer = (): void => {
      if (props.value < Date.now()) return
      timerRef.value = window.setInterval(() => {
        const innerValue = differenceInMilliseconds(props.value, Date.now())
        if (innerValue <= 0) {
          stopTimer()
          props.onFinish?.()
        }
        displayValueRef.value = getTimeString(
          Math.max(innerValue, 0),
          props.format
        )
        props.onChange?.(Math.max(innerValue, 0))
      }, REFRESH_INTERVAL)
    }
    const stopTimer = (): void => {
      if (timerRef.value) {
        window.clearInterval(timerRef.value)
        timerRef.value = 0
      }
    }
    onMounted(() => {
      if (props.start) {
        startTimer()
      }
    })
    onBeforeUnmount(() => {
      stopTimer()
    })
    watch(start, (value) => {
      value && !timerRef.value ? startTimer() : stopTimer()
    })
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      'Countdown',
      style,
      statisticLight,
      props,
      mergedClsPrefixRef
    )
    return {
      displayValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          self: {
            labelFontWeight,
            valueFontWeight,
            valuePrefixTextColor,
            labelTextColor,
            valueSuffixTextColor,
            valueTextColor,
            labelFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--label-font-size': labelFontSize,
          '--label-font-weight': labelFontWeight,
          '--label-text-color': labelTextColor,
          '--value-font-weight': valueFontWeight,
          '--value-prefix-text-color': valuePrefixTextColor,
          '--value-suffix-text-color': valueSuffixTextColor,
          '--value-text-color': valueTextColor
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-statistic ${mergedClsPrefix}-statistic-countdown`}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-statistic__label`}>
          {this.lable || $slots.lable?.()}
        </div>
        <div class={`${mergedClsPrefix}-statistic-value`}>
          <span class={`${mergedClsPrefix}-statistic-value__content`}>
            {this.displayValueRef}
          </span>
        </div>
      </div>
    )
  }
})
