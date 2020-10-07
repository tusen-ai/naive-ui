<template>
  <div
    class="n-statistic"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-statistic--${type}-type`]: type
    }"
  >
    <div class="n-statistic__label">
      {{ label }}
    </div>
    <div class="n-statistic-value">
      <span class="n-statistic-value__prefix">
        <slot name="prefix" />
      </span>
      <span
        v-if="value"
        class="n-statistic-value__content"
      >
        {{ value }}
      </span>
      <span
        v-else-if="$slots.default"
        class="n-statistic-value__content"
      >
        <slot />
      </span>
      <span class="n-statistic-value__suffix">
        <slot name="suffix" />
      </span>
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Statistic',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    type: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    valueStyle: {
      type: [Object, String],
      default: null
    }
  }
}
</script>
