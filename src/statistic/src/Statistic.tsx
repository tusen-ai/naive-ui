import { defineComponent, computed, h } from 'vue'
import { useConfig, useTheme, useThemeClass, useRtl } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { statisticLight } from '../styles'
import type { StatisticTheme } from '../styles'
import style from './styles/index.cssr'

export const statisticProps = {
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
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Statistic',
      '-statistic',
      style,
      statisticLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Statistic', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        self: {
          labelFontWeight,
          valueFontSize,
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
        '--n-value-font-size': valueFontSize,
        '--n-value-prefix-text-color': valuePrefixTextColor,
        '--n-value-suffix-text-color': valueSuffixTextColor,
        '--n-value-text-color': valueTextColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('statistic', undefined, cssVarsRef, props)
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      mergedClsPrefix,
      $slots: {
        default: defaultSlot,
        label: labelSlot,
        prefix: prefixSlot,
        suffix: suffixSlot
      }
    } = this
    this.onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-statistic`,
          this.themeClass,
          this.rtlEnabled && `${mergedClsPrefix}-statistic--rtl`
        ]}
        style={this.cssVars as any}
      >
        {resolveWrappedSlot(labelSlot, (children) => (
          <div class={`${mergedClsPrefix}-statistic__label`}>
            {this.label || children}
          </div>
        ))}
        <div
          class={`${mergedClsPrefix}-statistic-value`}
          style={{
            fontVariantNumeric: this.tabularNums ? 'tabular-nums' : ''
          }}
        >
          {resolveWrappedSlot(
            prefixSlot,
            (children) =>
              children && (
                <span class={`${mergedClsPrefix}-statistic-value__prefix`}>
                  {children}
                </span>
              )
          )}
          {this.value !== undefined ? (
            <span class={`${mergedClsPrefix}-statistic-value__content`}>
              {this.value}
            </span>
          ) : (
            resolveWrappedSlot(
              defaultSlot,
              (children) =>
                children && (
                  <span class={`${mergedClsPrefix}-statistic-value__content`}>
                    {children}
                  </span>
                )
            )
          )}
          {resolveWrappedSlot(
            suffixSlot,
            (children) =>
              children && (
                <span class={`${mergedClsPrefix}-statistic-value__suffix`}>
                  {children}
                </span>
              )
          )}
        </div>
      </div>
    )
  }
})
