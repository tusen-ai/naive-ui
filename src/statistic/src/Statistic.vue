<template>
  <div class="n-statistic" :style="cssVars">
    <div class="n-statistic__label">
      {{ label }}
    </div>
    <div class="n-statistic-value">
      <span v-if="$slots.prefix" class="n-statistic-value__prefix">
        <slot name="prefix" />
      </span>
      <span v-if="value" class="n-statistic-value__content">
        {{ value }}
      </span>
      <span v-else-if="$slots.default" class="n-statistic-value__content">
        <slot />
      </span>
      <span v-if="$slots.suffix" class="n-statistic-value__suffix">
        <slot name="suffix" />
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { statisticLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Statistic',
  props: {
    ...useTheme.props,
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    valueStyle: {
      type: [Object, String],
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Statistic',
      'Statistic',
      style,
      statisticLight,
      props
    )
    return {
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
  }
})
</script>
