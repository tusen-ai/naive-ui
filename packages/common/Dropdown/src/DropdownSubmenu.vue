<template>
  <n-dropdown-item
    ref="selectOption"
    :label="label"
    :value="value"
  >
    <div
      ref="activator"
      class="n-dropdown-submenu-activator"
    >
      <slot name="activator" />
    </div>
    <transition
      name="n-fade-in-scale-up--transition"
    >
      <n-dropdown-menu
        v-if="menuActivated"
        ref="dropdownMenu"
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

export default {
  name: 'NDropdownSubmenu',
  components: {
    NDropdownMenu,
    NDropdownItem
  },
  mixins: [themeable],
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
    }
  },
  data () {
    return {
      active: false,
      vanishTimerId: null,
      collectedOptions: [],
      menuActivated: false
    }
  },
  computed: {
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
      this.active = true
    },
    deactivate () {
      if (this.vanishTimerId) {
        window.clearTimeout(this.vanishTimerId)
        this.vanishTimerId = null
      }
      this.vanishTimerId = window.setTimeout(() => {
        this.active = false
      }, this.duration)
    }
  }
}
</script>
