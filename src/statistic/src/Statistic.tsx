import {
  defineComponent,
  computed,
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
  valueStyle: {
    type: [Object, String] as PropType<undefined | string | CSSProperties>,
    default: undefined
  }
}

export type StatisticProps = ExtractPublicPropTypes<typeof statisticProps>

export default defineComponent({
  name: 'Statistic',
  props: statisticProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      'Statistic',
      style,
      statisticLight,
      props,
      mergedClsPrefix
    )
    return {
      mergedClsPrefix,
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
          {this.value !== undefined ? (
            <span class={`${mergedClsPrefix}-statistic-value__content`}>
              {this.value}
            </span>
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
