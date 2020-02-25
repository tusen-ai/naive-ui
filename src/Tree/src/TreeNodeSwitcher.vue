<template>
  <span
    class="n-tree-node-switcher"
    :class="{
      'n-tree-node-switcher--expanded': expanded,
      'n-tree-node-switcher--hide': hide
    }"
    @click="handleClick"
  >
    <div class="n-tree-node-switcher__icon">
      <n-icon-switch-transition>
        <n-icon v-if="!loading" key="switcher">
          <md-arrow-dropright />
        </n-icon>
        <n-base-loading v-else key="loading" :theme="NTree.syntheticTheme" />
      </n-icon-switch-transition>
    </div>
  </span>
</template>

<script>
import mdArrowDropright from '../../_icons/md-arrow-dropright'
import NBaseLoading from '../../_base/Loading'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'

export default {
  name: 'NTreeSwitcher',
  inject: {
    NTree: {
      default: null
    }
  },
  components: {
    mdArrowDropright,
    NBaseLoading,
    NIconSwitchTransition
  },
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    },
    loading: {
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
