<template>
  <n-dropdown-submenu v-if="shouldBeRenderedAsDropdownSubmenu && !NMenuUl" :value="value" :label="title" :name="name" :selected="NMenu.activeNames.includes(name)">
    <template v-slot:activator>
      <render :render="title" />
    </template>
    <slot />
  </n-dropdown-submenu>
  <li
    v-else
    class="n-sub-menu"
    :class="{
      'n-sub-menu--selected-inside': selectedInside
    }"
  >
    <n-dropdown
      v-if="isFirstLevel"
      size="large"
      trigger="click"
      :focusable="false"
      :disabled="!isFirstLevel || !NMenu.collapsed"
      placement="right-start"
      type="menu"
      @select="handleDropdownSelect"
    >
      <template v-slot:activator>
        <div
          class="n-sub-menu-item n-dropdown"
          :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
          :class="{
            'n-sub-menu-item--collapsed': contentCollapsed,
            'n-sub-menu-item--active': !contentCollapsed,
            'n-sub-menu-item--disabled': disabled,
          }"
          @click="handleClick"
        >
          <div
            v-if="$slots.icon"
            class="n-sub-menu-item__icon"
            :style="{
              width: maxIconSize && (maxIconSize + 'px'),
              height: maxIconSize && (maxIconSize + 'px'),
              fontSize: activeIconSize && (activeIconSize + 'px'),
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
      </template>
      <slot />
    </n-dropdown>
    <div
      v-else
      class="n-sub-menu-item n-dropdown"
      :style="{paddingLeft: delayedPaddingLeft + 'px'}"
      :class="{
        'n-sub-menu-item--collapsed': contentCollapsed,
        'n-sub-menu-item--active': !contentCollapsed,
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
      <n-menu-ul
        v-show="!contentCollapsed"
        class="n-sub-menu-content"
      >
        <slot />
      </n-menu-ul>
    </fade-in-height-expand-transition>
  </li>
</template>

<script>
import collectable from '../../../mixins/collectable'
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import render from '../../../utils/render'
import NDropdown from '../../Dropdown/src/Dropdown'
import NDropdownSubmenu from '../../Dropdown/src/DropdownSubmenu'
import NMenuUl from './MenuUl'

export default {
  name: 'NSubMenu',
  components: {
    FadeInHeightExpandTransition,
    NDropdown,
    NDropdownSubmenu,
    NMenuUl,
    render
  },
  mixins: [
    collectable('NSubMenu', 'menuItemNames', 'menuItemNames', true)
  ],
  provide () {
    return {
      NSubMenu: this,
      NMenuItemGroup: null
    }
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
    },
    NMenuUl: {
      default: null
    }
  },
  props: {
    value: {
      type: Number,
      default: null
    },
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
  data () {
    return {
      delayedPaddingLeft: null,
      menuItemNames: []
    }
  },
  computed: {
    selectedInside () {
      return this.menuItemNames.includes(this.NMenu.value)
    },
    disabledCollectable () {
      return this.shouldBeRenderedAsDropdownSubmenu
    },
    shouldBeRenderedAsDropdownSubmenu () {
      return this.NMenu.collapsed && !this.isFirstLevel
    },
    useCollapsedIconSize () {
      return this.NMenu.collapsed && this.isFirstLevel
    },
    maxIconSize () {
      return Math.max(this.collapsedIconSize, this.iconSize)
    },
    activeIconSize () {
      if (this.useCollapsedIconSize) {
        return this.collapsedIconSize
      } else {
        return this.iconSize
      }
    },
    iconSize () {
      return this.NMenu && this.NMenu.iconSize
    },
    collapsedIconSize () {
      return this.NMenu.collapsedIconSize || this.NMenu.iconSize
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
    contentCollapsed () {
      return this.NMenu.collapsed || !(this.NMenu.synthesizedOpenNames.includes(this.name))
    }
  },
  watch: {
    selectedInside (value) {
      if (!value) {
        this.NMenu.activeNames = Array.from(new Set(this.NMenu.activeNames).delete(this.name))
      } else {
        this.NMenu.activeNames = Array.from(new Set(this.NMenu.activeNames).add(this.name))
      }
    },
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
    if (this.selectedInside) {
      this.NMenu.activeNames = Array.from(new Set(this.NMenu.activeNames).add(this.name))
    }
  },
  methods: {
    handleDropdownSelect (value) {
      this.NMenu.handleSelect(value)
    },
    handleClick () {
      if (!this.disabled && !this.NMenu.collapsed) {
        this.NMenu.handleOpenNamesChange(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
