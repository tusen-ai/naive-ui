<template>
  <n-dropdown-submenu
    v-if="shouldBeRenderedAsDropdownSubmenu && !NMenuUl"
    :value="value"
    :label="title"
    :name="name"
    :selected="selectedInside"
  >
    <template v-slot:activator>
      <render :render="title" />
    </template>
    <slot />
  </n-dropdown-submenu>
  <li
    v-else
    class="n-submenu"
    :class="{
      'n-submenu--selected-inside': selectedInside
    }"
  >
    <n-dropdown
      v-if="isFirstLevel"
      size="large"
      trigger="click"
      :focusable="false"
      :disabled="!NMenu.collapsed"
      placement="right-start"
      type="menu"
      @select="handleDropdownSelect"
    >
      <template v-slot:activator>
        <div
          class="n-submenu-item n-dropdown"
          :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
          :class="{
            'n-submenu-item--collapsed': contentCollapsed,
            'n-submenu-item--active': !contentCollapsed,
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
        </div>
      </template>
      <slot />
    </n-dropdown>
    <div
      v-else
      class="n-submenu-item n-submenu-item--as-dropdown"
      :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
      :class="{
        'n-submenu-item--collapsed': contentCollapsed,
        'n-submenu-item--active': !contentCollapsed,
        'n-submenu-item--disabled': disabled
      }"
      @click="handleClick"
    >
      <div
        v-if="$slots.icon"
        class="n-submenu-item__icon"
        :style="{
          width: iconSize && (iconSize + 'px'),
          height: iconSize && (iconSize + 'px'),
          fontSize: iconSize && (iconSize + 'px'),
        }"
      >
        <slot name="icon" />
      </div>
      <div class="n-submenu-item__header">
        <slot name="header">
          <render :render="title" />
        </slot>
      </div>
    </div>
    <fade-in-height-expand-transition>
      <n-menu-ul
        v-show="!contentCollapsed"
        class="n-submenu-content"
      >
        <slot />
      </n-menu-ul>
    </fade-in-height-expand-transition>
  </li>
</template>

<script>
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import render from '../../../utils/render'
import NDropdown from '../../Dropdown/src/Dropdown'
import NDropdownSubmenu from '../../Dropdown/src/DropdownSubmenu'
import NMenuUl from './MenuUl'

export default {
  name: 'NSubmenu',
  components: {
    FadeInHeightExpandTransition,
    NDropdown,
    NDropdownSubmenu,
    NMenuUl,
    render
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
      return !this.NSubmenu && !this.NMenuItemGroup
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
      } else if (this.NSubmenu) {
        return this.NMenu.indent + this.NSubmenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    contentCollapsed () {
      return this.NMenu.collapsed || !(this.NMenu.synthesizedOpenNames.includes(this.name))
    }
  },
  watch: {
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  mounted () {
    // console.log('submenu mounted', this.name)
  },
  provide () {
    return {
      NSubmenu: this,
      NMenuItemGroup: null
    }
  },
  inject: {
    NMenu: {
      default: null
    },
    NSubmenu: {
      default: null
    },
    NMenuItemGroup: {
      default: null
    },
    NMenuUl: {
      default: null
    }
  },
  created () {
    // console.log('submenu created', this.name)
    this.delayedPaddingLeft = this.paddingLeft
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
