<template>
  <ol
    class="n-ol"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-ol--align-text': alignText
    }"
    v-on="$listeners"
  >
    <slot />
  </ol>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NOl',
  mixins: [withapp, themeable],
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  }
}
</script>
