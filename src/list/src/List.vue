<template>
  <ul
    class="n-list"
    :class="{
      'n-list--bordered': bordered,
      [`n-list--${size}-size`]: size,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
  >
    <div v-if="$slots.header" class="n-list__header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="n-list__footer">
      <slot name="footer" />
    </div>
  </ul>
</template>

<script>
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'List',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>
