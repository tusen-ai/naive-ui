<template>
  <li class="n-menu-item-group">
    <span class="n-menu-item-group-title" :style="{ paddingLeft: paddingLeft + 'px' }">
      <slot name="header"><render :render="title" /></slot>
    </span>
    <div>
      <slot />
    </div>
  </li>
</template>
<script>
import render from '../../../utils/render'

export default {
  name: 'NMenuItemGroup',
  components: {
    render
  },
  props: {
    title: {
      type: [String, Function],
      default: null
    }
  },
  provide () {
    return {
      NMenuItemGroup: this,
      NSubMenu: null
    }
  },
  inject: {
    NMenuItemGroup: {
      default: null
    },
    NMenu: {
      default: null
    },
    NSubMenu: {
      default: null
    }
  },
  data () {
    return {
      delayedPaddingLeft: null
    }
  },
  computed: {
    isFirstLevel () {
      return !this.NSubMenu && !this.NMenuItemGroup
    },
    paddingLeft () {
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubMenu) {
        return this.NMenu.indent / 2 + this.NSubMenu.paddingLeft
      } else {
        return (this.NMenu.rootIndent || this.NMenu.indent) / 2
      }
    }
  },
  watch: {
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
  }
}
</script>
