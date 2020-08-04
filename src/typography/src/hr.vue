<template>
  <ul
    class="n-hr"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <slot />
  </ul>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'Hr',
  mixins: [withapp, themeable]
}
</script>
