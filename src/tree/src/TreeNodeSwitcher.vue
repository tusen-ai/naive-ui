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
        <n-base-icon v-if="!loading" key="switcher">
          <switcher-icon />
        </n-base-icon>
        <n-base-loading v-else key="loading" />
      </n-icon-switch-transition>
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SwitcherIcon } from '../../_base/icons'
import { NIconSwitchTransition, NBaseLoading, NBaseIcon } from '../../_base'

export default defineComponent({
  name: 'NTreeSwitcher',
  components: {
    SwitcherIcon,
    NBaseIcon,
    NBaseLoading,
    NIconSwitchTransition
  },
  inject: {
    NTree: {
      default: null
    }
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
  setup (props) {
    function doClick () {
      const { onClick } = props
      if (onClick) onClick()
    }
    return {
      handleClick () {
        doClick()
      }
    }
  }
})
</script>
