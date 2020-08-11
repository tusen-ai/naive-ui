<template>
  <ul
    class="n-list"
    :class="{
      'n-list--bordered': bordered,
      [`n-list--${size}-size`]: size,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <div v-if="$scopedSlots.header" class="n-list__header">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$scopedSlots.footer" class="n-list__footer">
      <slot name="footer" />
    </div>
  </ul>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'List',
  mixins: [withapp, themeable, usecssr(styles)],
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
