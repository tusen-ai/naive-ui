<template>
  <ul
    class="n-ul"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-ul--align-text': alignText
    }"
  >
    <slot />
  </ul>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NUl',
  mixins: [withapp, themeable],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
