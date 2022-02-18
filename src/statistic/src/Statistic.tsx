import { defineComponent, computed, CSSProperties, h } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
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
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      '-statistic',
      style,
      statisticLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('statistic', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-statistic`, this.themeClass]}
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
              {$slots.prefix()}
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
              {$slots.suffix()}
            </span>
          ) : null}
        </div>
      </div>
    )
  }
})
