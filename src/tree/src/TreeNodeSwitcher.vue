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
        <n-base-loading v-else key="loading" :theme="NTree.mergedTheme" />
      </n-icon-switch-transition>
    </div>
  </span>
</template>

<script>
import mdArrowDropright from '../../_icons/md-arrow-dropright.vue'
import NBaseLoading from '../../_base/loading'
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
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    doClick () {
      const { onClick } = this
      if (onClick) onClick()
    },
    handleClick () {
      this.doClick()
    }
  }
}
</script>
