<template>
  <li
    class="n-submenu"
    :class="{
      'n-submenu--selected-inside': selectedInside
    }"
  >
    <template v-if="renderContentAsPopover">
      <n-popover
        trigger="hover"
        placement="right-start"
        :show-arrow="false"
        :disabled="!rootMenuCollapsed"
        :overlay-style="{
          paddingTop: '8px',
          paddingBottom: '8px'
        }"
      >
        <template v-slot:activator>
          <n-submenu-item
            :padding-left="delayedPaddingLeft"
            :collapsed="synthesizedCollapsed"
            :disabled="disabled"
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            :show-arrow="true"
            @click="handleClick"
          >
            <template v-slot:icon>
              <slot name="icon" />
            </template>
            <template v-slot:header>
              <slot name="header" />
            </template>
          </n-submenu-item>
        </template>
        <n-menu
          :style="{
            width: '272px'
          }"
          :root-indent="24"
          :indent="24"
          :inside-popover="true"
          :submenu-collapsable="false"
          :value="rootMenuValue"
          @select="handlePopMenuSelect"
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
      <n-submenu-item
        :padding-left="delayedPaddingLeft"
        :collapsed="synthesizedCollapsed"
        :disabled="disabled"
        :max-icon-size="maxIconSize"
        :active-icon-size="activeIconSize"
        :title="title"
        :show-arrow="!rootMenuInsidePopover"
        @click="handleClick"
      >
        <template v-slot:icon>
          <slot name="icon" />
        </template>
        <template v-slot:header>
          <slot name="header" />
        </template>
      </n-submenu-item>
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
import NSubmenuItem from './SubmenuItem'
import NMenu from './Menu'
import menuContentMixin from './menuContentMixin'

export default {
  name: 'NSubmenu',
  components: {
    NSubmenuItem,
    FadeInHeightExpandTransition,
    NPopover,
    NMenu
  },
  mixins: [menuContentMixin],
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
      default: undefined
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
    renderedContentAsPopover () {
      return this.rootMenuCollapsed && this.atRoot
    },
    synthesizedDisabled () {
      if (this.disabled !== undefined) return this.undefined
      return this.NMenu && this.NMenu.disabled
    },
    collapsedAccrodingToOpenNames () {
      return !this.NMenu.synthesizedOpenNames.includes(this.name)
    },
    synthesizedCollapsed () {
      if (!this.NMenu.submenuCollapsable) return false
      else if (this.rootMenuCollapsed) return true
      return this.collapsedAccrodingToOpenNames
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
    }
  }
}
</script>
