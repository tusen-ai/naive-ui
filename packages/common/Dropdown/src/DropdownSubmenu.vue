<template>
  <n-dropdown-item
    ref="activator"
    :label="label"
    name="n-dropdown-submenu-item"
    :value="value"
    as-submenu
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="n-dropdown-submenu-activator"
    >
      <slot name="activator">
        {{ label }}
      </slot>
      <n-icon v-if="arrow" class="n-dropdown-submenu-activator__arrow">
        <ios-arrow-forward />
      </n-icon>
    </div>
    <transition
      name="n-fade-in-scale-up--transition"
    >
      <n-dropdown-menu
        v-if="active"
        ref="content"
        :style="style"
        :theme="synthesizedTheme"
        class="n-dropdown-submenu"
        :auto-focus="false"
      >
        <slot />
      </n-dropdown-menu>
    </transition>
  </n-dropdown-item>
</template>

<script>
import NDropdownMenu from './DropdownMenu'
import NDropdownItem from './DropdownItem'
import themeable from '../../../mixins/themeable'
import NIcon from '../../Icon'
import iosArrowForward from '../../../icons/ios-arrow-forward'
import placeable from '../../../mixins/placeable'

export default {
  name: 'NDropdownSubmenu',
  components: {
    NDropdownMenu,
    NDropdownItem,
    NIcon,
    iosArrowForward
  },
  mixins: [themeable, placeable],
  provide () {
    return {
      NDropdownSubmenu: this
    }
  },
  inject: {
    NDropdownMenu: {
      default: null
    },
    NBaseSelectMenu: {
      default: null
    },
    NDropdownSubmenu: {
      default: null
    }
  },
  props: {
    arrow: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    positionMode: {
      type: String,
      default: 'absolute'
    },
    placement: {
      type: String,
      default: 'right-start'
    }
  },
  data () {
    return {
      vanishTimerId: null,
      collectedOptions: [],
      menuActivated: false
    }
  },
  computed: {
    active () {
      return this.menuActivated && this.menuPendingToBeActivated
    },
    synthesizedStyleWidth () {
      if (this.NDropdownMenu.inheritedSubmenuWidth) {
        return this.NDropdownMenu.inheritedSubmenuWidth + 'px'
      }
      return null
    },
    synthesizedStyleMinWidth () {
      if (this.NDropdownMenu.inheritedSubmenuMinWidth) {
        return this.NDropdownMenu.inheritedSubmenuMinWidth + 'px'
      }
      return null
    },
    synthesizedStyleMaxWidth () {
      if (this.NDropdownMenu.inheritedSubmenuMaxWidth) {
        return this.NDropdownMenu.inheritedSubmenuMaxWidth + 'px'
      }
      return null
    },
    style () {
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      } else if (this.synthesizedStyleWidth) {
        style.width = this.synthesizedStyleWidth
      }
      if (this.minWidth) {
        style.minWidth = this.minWidth + 'px'
      }
      if (this.maxWidth) {
        style.maxWidth = this.maxWidth + 'px'
      }
      return style
    },
    pendingOption () {
      if (this.NBaseSelectMenu) {
        return this.NBaseSelectMenu.pendingOption
      }
      return null
    },
    pendingOptionId () {
      if (this.pendingOption) {
        return this.pendingOption.id
      }
      return null
    },
    menuPendingToBeActivated () {
      /**
       * Here value is index + 1
       * pendingOptiondId also means index + 1
       */
      if (this.value && this.pendingOptionId) {
        return this.value === this.pendingOptionId
      }
      return false
    }
  },
  watch: {
    menuPendingToBeActivated (value) {
      let rootDropdownMenu = this.NDropdownMenu
      while (rootDropdownMenu.NDropdownMenu) {
        rootDropdownMenu = rootDropdownMenu.NDropdownMenu
      }
      if (value) {
        this.$nextTick().then(() => {
          rootDropdownMenu.pendingSubMenuInstance = this
        })
      } else {
        rootDropdownMenu.pendingSubMenuInstance = null
      }
    }
  },
  methods: {
    handleMouseEnter () {
      this.activate()
    },
    handleMouseLeave (e) {
      if (this.$el.parentElement.contains(e.relatedTarget)) {
        this.deactivate()
      }
    },
    activate () {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      this.menuActivated = true
    },
    deactivate () {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      this.vanishTimerId = window.setTimeout(() => {
        this.menuActivated = false
      }, this.duration)
    }
  }
}
</script>
