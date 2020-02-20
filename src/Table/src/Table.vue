<template>
  <table
    class="n-table"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
  >
    <slot />
  </table>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NTable',
  mixins: [withapp, themeable]
}
</script>
