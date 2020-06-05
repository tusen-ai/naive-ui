<template>
  <router-link
    v-if="to"
    class="n-a"
    :to="to"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <slot />
  </router-link>
  <a
    v-else
    class="n-a"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  ><slot /></a>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NA',
  mixins: [ withapp, themeable ],
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>
