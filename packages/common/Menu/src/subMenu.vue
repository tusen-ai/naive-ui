<template>
  <li
    class="n-sub-menu"
  >
    <div
      class="n-sub-menu-item"
      :style="{paddingLeft: paddingLeft + 'px'}"
      :class="{
        'n-sub-menu-item--collapsed': isCollapsed,
        'n-sub-menu-item--active': !isCollapsed,
        'n-sub-menu-item--disabled': disabled,
      }"
      @click="handleClick"
    >
      <div
        v-if="$slots.icon"
        class="n-sub-menu-item__icon"
        :style="{
          width: iconSize && (iconSize + 'px'),
          height: iconSize && (iconSize + 'px'),
          fontSize: iconSize && (iconSize + 'px'),
        }"
      >
        <slot name="icon" />
      </div>
      <div class="n-sub-menu-item__header">
        <slot name="header">
          <render :render="title" />
        </slot>
      </div>
    </div>
    <fade-in-height-expand-transition>
      <ul
        v-if="!isCollapsed"
        class="n-sub-menu-content"
      >
        <slot />
      </ul>
    </fade-in-height-expand-transition>
  </li>
</template>
<script>
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import render from '../../../utils/render'

export default {
  name: 'NSubMenu',
  provide () {
    return {
      NSubMenu: this,
      NMenuItemGroup: null
    }
  },
  components: {
    FadeInHeightExpandTransition,
    render
  },
  inject: {
    NMenu: {
      default: null
    },
    NSubMenu: {
      default: null
    },
    NMenuItemGroup: {
      default: null
    }
  },
  props: {
    title: {
      type: [String, Function],
      default: null
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconSize () {
      return this.NMenu && this.NMenu.iconSize
    },
    isFirstLevel () {
      return !this.NSubMenu && !this.NMenuItemGroup
    },
    synthesizedDisabled () {
      return (this.NMenu && this.NMenu.disabled) || this.disabled
    },
    paddingLeft () {
      if (this.isFirstLevel && this.NMenu.collapsedWidth !== null && this.NMenu.collapsed) {
        return this.NMenu.collapsedWidth / 2 - this.iconSize / 2
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubMenu) {
        return this.NMenu.indent + this.NSubMenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    isCollapsed () {
      return this.NMenu.collapsed || !(this.NMenu.synthesizedOpenNames.includes(this.name))
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled && !this.NMenu.collapsed) {
        this.NMenu.handleOpenNamesChange(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
