<template>
  <li
    class="n-sub-menu"
  >
    <div
      class="n-sub-menu-header"
      :style="{paddingLeft: paddingLeft + 'px'}"
      :class="{
        'n-sub-menu-header--collapsed': isCollapsed,
        'n-sub-menu-header--active': !isCollapsed,
        'n-sub-menu-header--disabled': disabled,
      }"
      @click="handleClick"
    >
      <!-- <span
        v-if="hasIcon"
        class="n-menu-title-icon"
      /> -->
      <slot name="header">
        <render :render="title" />
      </slot>
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
    synthesizedDisabled () {
      return (this.NMenu && this.NMenu.disabled) || this.disabled
    },
    paddingLeft () {
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubMenu) {
        return this.NMenu.indent + this.NSubMenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    isCollapsed () {
      return !(this.NMenu.synthesizedOpenNames.includes(this.name))
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.NMenu.handleOpenNamesChange(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
