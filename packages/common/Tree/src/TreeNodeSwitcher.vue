<template>
  <span
    class="n-tree-node-switcher"
    :class="{
      'n-tree-node-switcher--expanded': expanded,
      'n-tree-node-switcher--hide': hide
    }"
    @click="handleClick"
  >
    <n-tree-switcher-icon />
  </span>
</template>

<script>
import NTreeSwitcherIcon from './SwitcherIcon'

export default {
  name: 'NTreeSwitcher',
  components: {
    NTreeSwitcherIcon
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
