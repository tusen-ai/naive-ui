<template>
  <div
    class="n-statistic"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
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
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'

export default {
  name: 'Statistic',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
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
  }
}
</script>
