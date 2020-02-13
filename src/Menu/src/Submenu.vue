<template>
  <li
    class="n-submenu"
  >
    <template v-if="renderContentAsPopover">
      <n-popover
        trigger="hover"
        :placement="submenuPopoverPlacement"
        :show-arrow="false"
        :controller="popoverController"
        :disabled="(!rootMenuIsHorizontal && !rootMenuCollapsed) || syntheticDisabled"
        :directive="rootMenuIsHorizontal ? 'show' : 'if'"
        :overlay-style="{
          width: overlayWidth === null ? null : overlayMinWidth + 'px',
          minWidth: overlayMinWidth + 'px',
          paddingTop: '8px',
          paddingBottom: '8px'
        }"
        @show="handlePopMenuShow"
        @hide="handlePopMenuHide"
      >
        <template v-slot:activator>
          <n-menu-item-content
            :padding-left="delayedPaddingLeft"
            :collapsed="syntheticCollapsed"
            :disabled="disabled"
            :max-icon-size="maxIconSize"
            :active-icon-size="activeIconSize"
            :title="title"
            :title-extra="titleExtra"
            :hover="hover"
            :show-arrow="!rootMenuIsHorizontal"
            :child-selected="selectedInside"
            @click="handleClick"
          >
            <template v-slot:icon>
              <slot name="icon" />
            </template>
            <template v-slot:header>
              <slot name="header" />
            </template>
            <template v-slot:header-extra>
              <slot name="header-extra" />
            </template>
          </n-menu-item-content>
        </template>
        <n-menu
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
      <fade-in-height-expand-transition v-if="!rootMenuIsHorizontal">
        <ul
          v-show="!syntheticCollapsed"
          class="n-submenu-content"
        >
          <slot />
        </ul>
      </fade-in-height-expand-transition>
    </template>
    <template v-else>
      <n-menu-item-content
        :padding-left="delayedPaddingLeft"
        :collapsed="syntheticCollapsed"
        :disabled="disabled"
        :max-icon-size="maxIconSize"
        :active-icon-size="activeIconSize"
        :title="title"
        :title-extra="titleExtra"
        :show-arrow="!rootMenuInsidePopover"
        :uncollapsable="rootMenuInsidePopover"
        :child-selected="selectedInside"
        @click="handleClick"
      >
        <template v-slot:icon>
          <slot name="icon" />
        </template>
        <template v-slot:header>
          <slot name="header" />
        </template>
        <template v-slot:header-extra>
          <slot name="header-extra" />
        </template>
      </n-menu-item-content>
      <fade-in-height-expand-transition>
        <ul
          v-show="!syntheticCollapsed"
          class="n-submenu-content"
        >
          <slot />
        </ul>
      </fade-in-height-expand-transition>
    </template>
  </li>
</template>

<script>
import FadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import NPopover from '../../Popover'
import NMenuItemContent from './MenuItemContent'
import NMenu from './Menu'
import menuContentMixin from './menuContentMixin'

export default {
  name: 'NSubmenu',
  components: {
    NMenuItemContent,
    FadeInHeightExpandTransition,
    NPopover,
    NMenu
  },
  mixins: [menuContentMixin],
  props: {
    title: {
      type: [String, Function],
      default: null
    },
    titleExtra: {
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
      menuItemNames: [],
      hover: false,
      popoverController: {}
    }
  },
  computed: {
    overlayWidth () {
      return this.NMenu.overlayWidth
    },
    overlayMinWidth () {
      return this.NMenu.overlayMinWidth
    },
    selectedInside () {
      return this.menuItemNames.includes(this.NMenu.value)
    },
    renderedContentAsPopover () {
      return this.rootMenuCollapsed && this.atRoot
    },
    syntheticDisabled () {
      if (this.disabled !== undefined) return this.disabled
      if (this.PenetratedNSubmenu) return this.PenetratedNSubmenu.syntheticDisabled
      return this.NMenu && this.NMenu.disabled
    },
    collapsedAccrodingToOpenNames () {
      return !this.NMenu.syntheticOpenNames.includes(this.name)
    },
    syntheticCollapsed () {
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
      PenetratedNSubmenu: this,
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
      this.popoverController.hide()
    },
    handlePopMenuHide () {
      this.hover = false
    },
    handlePopMenuShow () {
      this.hover = true
    }
  }
}
</script>
