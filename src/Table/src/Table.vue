<template>
  <table
    class="n-table"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-table--${size}-size`]: true,
      'n-table--bordered': bordered,
      'n-table--single-line': singleLine,
      'n-table--single-column': singleColumn
    }"
  >
    <slot />
  </table>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NTable',
  mixins: [withapp, themeable],
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    singleLine: {
      type: Boolean,
      default: true
    },
    singleColumn: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    }
  }
}
</script>
