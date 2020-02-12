<template>
  <div
    class="n-table"
    :class="{

      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <table cellspacing="0">
      <slot>default table content</slot>
    </table>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'NTable',
  mixins: [withapp, themeable]
}
</script>

<style lang="scss" scoped>

</style>
