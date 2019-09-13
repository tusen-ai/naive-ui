<template>
  <span
    class="n-tree-node-switcher"
    :class="{
      'n-tree-node-switcher--expand': expand,
      'n-tree-node-switcher--hide': hide
    }"
    @click="handleClick"
  >
    <n-tree-switcher-icon />
  </span>
</template>

<script>
import NTreeSwitcherIcon from './switcherIcon'

export default {
  name: 'NTreeSwitcher',
  components: {
    NTreeSwitcherIcon
  },
  props: {
    expand: {
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
