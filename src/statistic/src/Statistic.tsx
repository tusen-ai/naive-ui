import { defineComponent, computed, CSSProperties, h, renderSlot } from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { statisticLight } from '../styles'
import type { StatisticTheme } from '../styles'
import style from './styles/index.cssr'

const statisticProps = {
  ...(useTheme.props as ThemeProps<StatisticTheme>),
  tabularNums: Boolean,
  label: String,
  value: [String, Number]
}

export type StatisticProps = ExtractPublicPropTypes<typeof statisticProps>

export default defineComponent({
  name: 'Statistic',
  props: statisticProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      'Statistic',
      style,
      statisticLight,
      props,
      mergedClsPrefixRef
    )
    return {
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
        <div
          class={`${mergedClsPrefix}-statistic-value`}
          style={{
            fontVariantNumeric: this.tabularNums ? 'tabular-nums' : ''
          }}
        >
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
