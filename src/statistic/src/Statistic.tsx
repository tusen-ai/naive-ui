import {
  defineComponent,
  computed,
  onMounted,
  watch,
  ref,
  CSSProperties,
  PropType,
  h,
  renderSlot
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { statisticLight } from '../styles'
import type { StatisticTheme } from '../styles'
import style from './styles/index.cssr'
import { format } from 'date-fns'
import { tween } from './utils'
import { round, isNumber } from 'lodash'

const statisticProps = {
  ...(useTheme.props as ThemeProps<StatisticTheme>),
  label: {
    type: String,
    default: undefined
  },
  value: {
    type: [String, Number],
    default: undefined
  },
  precision: Number,
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  separator: String,
  showSeprator: {
    type: Boolean,
    default: false
  },
  valueStyle: {
    type: [Object, String] as PropType<undefined | string | CSSProperties>,
    default: undefined
  },
  valueFrom: Number,
  start: {
    type: Boolean,
    default: true
  },
  animation: {
    type: Boolean,
    default: false
  },
  animationDuration: {
    type: Number,
    default: 3000
  }
}

export type StatisticProps = ExtractPublicPropTypes<typeof statisticProps>

export default defineComponent({
  name: 'Statistic',
  props: statisticProps,
  setup (props) {
    const { animationDuration } = props
    const valueRef = ref(props.valueFrom ?? props.value)
    const hastweenRef = ref(false)
    const onUpdate = (currentValue: number): void => {
      valueRef.value = currentValue
    }
    const onFinish = (): void => {
      valueRef.value = props.value
    }
    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = Number(props.value)
    ): void => {
      if (from !== to) {
        tween({
          from,
          to,
          duration: animationDuration,
          onUpdate,
          onFinish
        })
        hastweenRef.value = true
      }
    }
    const formatValue = computed(() => {
      let innerValue = valueRef.value
      if (isNumber(innerValue)) {
        if (props.precision) {
          innerValue = round(innerValue, props.precision).toFixed(
            props.precision
          )
        }
        const splitValue = innerValue.toString().split('.')
        const integer = props.showSeprator
          ? Number(splitValue[0]).toLocaleString('en-US')
          : splitValue[0]
        const decimal = splitValue[1]
        return {
          isNumber: true,
          integer,
          decimal
        }
      }
      innerValue = format(new Date(Number(innerValue)), props.format)
      return {
        isNumber: false,
        value: innerValue
      }
    })
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      'Statistic',
      style,
      statisticLight,
      props,
      mergedClsPrefixRef
    )
    onMounted(() => {
      if (props.animation && props.start) animation()
    })
    watch(
      () => props.start,
      (value) => {
        if (value && !hastweenRef.value) animation()
      }
    )
    return {
      formatValue,
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
          '--n-bezier': cubicBezierEaseInOut,
          '--n-label-font-size': labelFontSize,
          '--n-label-font-weight': labelFontWeight,
          '--n-label-text-color': labelTextColor,
          '--n-value-font-weight': valueFontWeight,
          '--n-value-prefix-text-color': valuePrefixTextColor,
          '--n-value-suffix-text-color': valueSuffixTextColor,
          '--n-value-text-color': valueTextColor
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-statistic`}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-statistic__label`}>
          {this.label || $slots.label?.()}
        </div>
        <div class={`${mergedClsPrefix}-statistic-value`}>
          {$slots.prefix ? (
            <span class={`${mergedClsPrefix}-statistic-value__prefix`}>
              {renderSlot($slots, 'prefix')}
            </span>
          ) : null}
          {this.value ? (
            this.formatValue.isNumber ? (
              <span class={`${mergedClsPrefix}-statistic-value__content`}>
                {this.formatValue.integer ? `${this.formatValue.integer}` : ''}
                {this.formatValue.decimal ? `.${this.formatValue.decimal}` : ''}
              </span>
            ) : (
              <span class={`${mergedClsPrefix}-statistic-value__content`}>
                {this.formatValue.value}
              </span>
            )
          ) : (
            <span class={`${mergedClsPrefix}-statistic-value__content`}>
              {$slots}
            </span>
          )}
          {$slots.suffix ? (
            <span class={`${mergedClsPrefix}-statistic-value__suffix`}>
              {renderSlot($slots, 'suffix')}
            </span>
          ) : null}
        </div>
      </div>
    )
  }
})
