<template>
  <li
    class="n-li"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-li--align-text': alignText
    }"
  >
    <slot />
  </li>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'Li',
  mixins: [withapp, themeable],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
