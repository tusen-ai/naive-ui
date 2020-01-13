<template>
  <li
    class="n-menu-item"
    :style="{ paddingLeft: paddingLeft + 'px' }"
    :class="{
      'n-menu-item--selected': isSelected,
      'n-menu-item--disabled': synthesizedDisabled
    }"
    @click="handleClick"
  >
    <div
      v-if="$slots.icon"
      class="n-menu-item__icon"
      :style="{
        width: iconSize && (iconSize + 'px'),
        height: iconSize && (iconSize + 'px'),
        fontSize: iconSize && (iconSize + 'px'),
      }"
    >
      <slot name="icon" />
    </div>
    <div class="n-menu-item__header">
      <slot>
        <render :render="title" />
      </slot>
    </div>
  </li>
</template>
<script>
import registerable from '../../../mixins/registerable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import render from '../../../utils/render'

export default {
  name: 'NMenuItem',
  components: {
    render
  },
  mixins: [
    registerable('NMenu'),
    withapp,
    themeable
  ],
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
    synthesizedDisabled () {
      return ((this.NSubMenu && this.NSubMenu.synthesizedDisabled) || this.disabled)
    },
    isSelected () {
      if (this.NMenu.value === this.name) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleClick () {
      if (!this.synthesizedDisabled) {
        this.NMenu.handleSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
