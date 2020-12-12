<template>
  <table
    class="n-table"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
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
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'Table',
  mixins: [configurable, themeable, withCssr(styles)],
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
