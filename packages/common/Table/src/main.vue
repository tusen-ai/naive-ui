<template>
  <div
    class="n-table"
    :class="{

      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <table>
      <slot>default table content</slot>
    </table>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NTable',
  mixins: [withapp, themeable]
}
</script>

<style lang="scss" scoped>

</style>
