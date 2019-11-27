<template>
  <li class="n-menu-item-group">
    <span class="n-menu-item-group-title" :style="{paddingLeft: paddingLeft + 'px'}">
      {{ title }}
    </span>
    <div>
      <slot />
    </div>
  </li>
</template>
<script>
export default {
  name: 'NItemGroup',
  props: {
    title: {
      type: String,
      default: null
    }
  },
  inject: {
    NMenu: {
      default: null
    },
    NSubMenu: {
      default: null
    }
  },
  computed: {
    paddingLeft () {
      let padding = this.NMenu.indent / 2
      if (this.NSubMenu) {
        padding = padding + this.NSubMenu.paddingLeft
      }
      return padding
    }
  }
}
</script>
