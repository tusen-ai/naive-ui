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
          <switcher-icon />
        </n-icon>
        <n-base-loading v-else key="loading" :theme="'light'" />
      </n-icon-switch-transition>
    </div>
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import { SwitcherIcon } from '../../_base/icons'
import { NIconSwitchTransition, NBaseLoading } from '../../_base'

export default defineComponent({
  name: 'NTreeSwitcher',
  components: {
    SwitcherIcon,
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
  methods: {
    doClick () {
      const { onClick } = this
      if (onClick) onClick()
    },
    handleClick () {
      this.doClick()
    }
  }
})
</script>
