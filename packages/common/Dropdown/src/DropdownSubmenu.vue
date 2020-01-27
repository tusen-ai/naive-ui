<script>
import NDropdownMenu from './DropdownMenu'
import themeable from '../../../mixins/themeable'
import NIcon from '../../Icon'
import iosArrowForward from '../../../icons/ios-arrow-forward'
import placeable from '../../../mixins/placeable'

export default {
  name: 'NDropdownSubmenu',
  components: {
    NDropdownMenu,
    NIcon,
    iosArrowForward
  },
  mixins: [ themeable, placeable ],
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
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    arrow: {
      type: Boolean,
      default: true
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
    pendingOptionValue () {
      if (
        this.NBaseSelectMenu &&
        this.NBaseSelectMenu.pendingOptionValue !== null
      ) {
        return this.NBaseSelectMenu.pendingOptionValue
      }
      return null
    },
    size () {
      return this.NDropdownMenu.size
    },
    menuPendingToBeActivated () {
      if (this.data.value && this.pendingOptionValue) {
        return this.data.value === this.pendingOptionValue
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
          rootDropdownMenu.pendingSubmenuInstance = this
        })
      } else {
        rootDropdownMenu.pendingSubmenuInstance = null
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
  },
  render (h) {
    return h('div', {
      ref: 'activator',
      staticClass: 'n-dropdown-item n-dropdown-item--as-submenu',
      on: {
        mouseenter: this.handleMouseEnter,
        mouseleave: this.handleMouseLeave
      }
    }, [
      h('div', {
        staticClass: 'n-dropdown-submenu-activator'
      }, [
        this.data.label,
        this.arrow ? h(NIcon, {
          staticClass: 'n-dropdown-submenu-activator__arrow'
        }, [
          h(iosArrowForward)
        ]) : null
      ]),
      h('transition', {
        props: {
          name: 'n-fade-in-scale-up--transition'
        }
      }, [
        this.active ? h(NDropdownMenu, {
          ref: 'content',
          staticClass: 'n-dropdown-submenu',
          style: this.style,
          props: {
            options: this.options,
            theme: this.synthesizedTheme,
            defaultFocus: false,
            size: this.size
          }
        }) : null
      ])
    ])
  }
}
</script>
