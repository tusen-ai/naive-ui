<template>
  <li
    class="n-submenu"
    :class="{
      'n-submenu--selected-inside': selectedInside
    }"
  >
    <template v-if="isFirstLevel">
      <n-popover trigger="click" placement="right-start" :disabled="!usePopover">
        <template v-slot:activator>
          <div
            class="n-submenu-item"
            :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
            :class="{
              'n-submenu-item--collapsed': synthesizedCollapsed,
              'n-submenu-item--active': !synthesizedCollapsed,
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
        <n-menu
          :style="{
            width: '272px'
          }"
          :root-indent="24"
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
      <div
        class="n-submenu-item"
        :style="{ paddingLeft: delayedPaddingLeft + 'px' }"
        :class="{
          'n-submenu-item--collapsed': synthesizedCollapsed,
          'n-submenu-item--active': !synthesizedCollapsed,
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
import render from '../../../utils/render'
import NPopover from '../../../common/Popover'
import NMenu from './Menu'

export default {
  name: 'NSubmenu',
  components: {
    FadeInHeightExpandTransition,
    NPopover,
    NMenu,
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
    usePopover () {
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
      if (this.rootMenuInPopover) return this.selfCollapsed
      else if (this.rootMenuCollapsed) return true
      return this.selfCollapsed
    },
    popMenuValue () {
      return this.NMenu.value
    },
    popMenuOpenNames () {
      return this.NMenu.synthesizedOpenNames
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
