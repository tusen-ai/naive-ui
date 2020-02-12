<template>
  <div
    class="n-input-group-label"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-input-group-label--${size}-size`]: true
    }"
  >
    <slot />
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NInputGroupLabel',
  mixins: [
    withapp,
    themeable
  ],
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>
