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
      NSubmenu: null
    }
  },
  inject: {
    NMenuItemGroup: {
      default: null
    },
    NMenu: {
      default: null
    },
    NSubmenu: {
      default: null
    }
  },
  data () {
    return {
      delayedPaddingLeft: null
    }
  },
  computed: {
    atRoot () {
      return !this.NSubmenu && !this.NMenuItemGroup
    },
    paddingLeft () {
      if (this.atRoot) {
        return this.NMenu.rootIndent === null ? this.NMenu.indent : this.NMenu.rootIndent
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubmenu) {
        return this.NMenu.indent / 2 + this.NSubmenu.paddingLeft
      } else {
        return this.NMenu.indent / 2
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
