<template>
  <span
    class="n-tree-node-switcher"
    :class="{
      'n-tree-node-switcher--expanded': expanded,
      'n-tree-node-switcher--hide': hide
    }"
    @click="handleClick"
  >
    <n-icon>
      <md-arrow-dropright />
    </n-icon>
  </span>
</template>

<script>
import mdArrowDropright from '../../../icons/md-arrow-dropright'

export default {
  name: 'NTreeSwitcher',
  components: {
    mdArrowDropright
  },
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
