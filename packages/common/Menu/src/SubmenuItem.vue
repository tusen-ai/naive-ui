<template>
  <div
    class="n-submenu-item"
    :style="{ paddingLeft: paddingLeft + 'px' }"
    :class="{
      'n-submenu-item--collapsed': collapsed,
      'n-submenu-item--active': !collapsed,
      'n-submenu-item--disabled': disabled
    }"
    @click="handleClick"
  >
    <div
      v-if="$slots.icon"
      class="n-submenu-item__icon"
      :style="{
        width: maxIconSize && (maxIconSize + 'px'),
        height: maxIconSize && (maxIconSize + 'px'),
        fontSize: activeIconSize && (activeIconSize + 'px'),
      }"
    >
      <slot name="icon" />
    </div>
    <div class="n-submenu-item__header">
      <slot name="header">
        <render :render="title" />
      </slot>
    </div>
    <div v-if="showArrow" class="n-submenu-item__arrow" />
  </div>
</template>

<script>
import render from '../../../utils/render'

export default {
  name: 'NSubmenuItem',
  components: {
    render
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    paddingLeft: {
      type: Number,
      default: null
    },
    maxIconSize: {
      type: Number,
      default: null
    },
    activeIconSize: {
      type: Number,
      default: null
    },
    title: {
      type: [String, Function],
      default: null
    },
    showArrow: {
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
