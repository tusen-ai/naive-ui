<template>
  <li
    class="n-submenu"
    :class="{
      'n-submenu--selected-inside': selectedInside
    }"
  >
    <template v-if="isFirstLevel">
      <n-popover
        trigger="hover"
        placement="right-start"
        :show-arrow="false"
        :disabled="!renderedAsPopover"
        :overlay-style="{
          paddingTop: '8px',
          paddingBottom: '8px'
        }"
      >
        <template v-slot:activator>
          <n-submenu-header
            :padding-left="delayedPaddingLeft"
            :collapsed="synthesizedCollapsed"
            :disabled="disabled"
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            :show-arrow="showArrow"
            @click="handleClick"
          >
            <template v-slot:icon>
              <slot name="icon" />
            </template>
            <template v-slot:header>
              <slot name="header" />
            </template>
          </n-submenu-header>
        </template>
        <n-menu
          :style="{
            width: '272px'
          }"
          :show-submenu-arrow="false"
          :root-indent="24"
          :indent="24"
          in-popover
          :value="popMenuValue"
          :open-names="popMenuOpenNames"
          @select="handlePopMenuSelect"
          @open-names-change="handlePopMenuOpenNamesChange"
        >
          <slot />
        </n-menu>
      </n-popover>
      <fade-in-height-expand-transition>
        <ul
          v-show="!synthesizedCollapsed"
          class="n-submenu-content"
        >
          <slot />
        </ul>
      </fade-in-height-expand-transition>
    </template>
    <template v-else>
      <n-submenu-header
        :padding-left="delayedPaddingLeft"
        :collapsed="synthesizedCollapsed"
        :disabled="disabled"
        :max-icon-size="maxIconSize"
        :active-icon-size="activeIconSize"
        :title="title"
        :show-arrow="showArrow"
        @click="handleClick"
      >
        <template v-slot:icon>
          <slot name="icon" />
        </template>
        <template v-slot:header>
          <slot name="header" />
        </template>
      </n-submenu-header>
      <fade-in-height-expand-transition>
        <ul
          v-show="!synthesizedCollapsed"
          class="n-submenu-content"
        >
          <slot />
        </ul>
      </fade-in-height-expand-transition>
    </template>
  </li>
</template>

<script>
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import NPopover from '../../../common/Popover'
import NSubmenuHeader from './SubmenuHeader'
import NMenu from './Menu'

export default {
  name: 'NSubmenu',
  components: {
    NSubmenuHeader,
    FadeInHeightExpandTransition,
    NPopover,
    NMenu
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
    renderedAsPopover () {
      return this.useCollapsedIconSize
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
    rootMenuCollapsed () {
      return this.NMenu.collapsed
    },
    rootMenuInPopover () {
      return this.NMenu.inPopover
    },
    selfCollapsed () {
      return !this.NMenu.synthesizedOpenNames.includes(this.name)
    },
    synthesizedCollapsed () {
      if (this.rootMenuInPopover) return false
      else if (this.rootMenuCollapsed) return true
      return this.selfCollapsed
    },
    popMenuValue () {
      return this.NMenu.value
    },
    popMenuOpenNames () {
      return this.NMenu.synthesizedOpenNames
    },
    showArrow () {
      return this.NMenu.showSubmenuArrow
    }
  },
  watch: {
    paddingLeft (value) {
      this.$nextTick().then(() => {
        this.delayedPaddingLeft = value
      })
    }
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
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
  },
  methods: {
    handleClick () {
      if (!this.disabled && !this.NMenu.collapsed) {
        this.NMenu.toggleOpenName(this.name)
        this.$emit('click', this)
      }
    },
    handlePopMenuSelect (value) {
      this.NMenu.handleSelect(value)
    },
    handlePopMenuOpenNamesChange (value) {
      this.NMenu.handleOpenNamesChange(value)
    }
  }
}
</script>
