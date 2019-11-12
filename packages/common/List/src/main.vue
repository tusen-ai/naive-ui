<template>
  <ul
    class="n-list"
    :class="{
      'n-list--bordered': bordered,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
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
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NList',
  mixins: [withapp, themeable],
  props: {
    bordered: {
      type: Boolean,
      default: true
    }
  }
}
</script>
