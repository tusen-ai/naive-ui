<template>
  <blockquote
    class="n-blockquote"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-blockquote--align-text': alignText
    }"
  >
    <slot />
  </blockquote>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'Blockquote',
  mixins: [withapp, themeable],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
