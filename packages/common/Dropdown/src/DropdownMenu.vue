<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import WrapWithValue from './WrapWithValue'
import {
  NBaseSelectMenu
} from '../../../base/SelectMenu'

export default {
  name: 'NDropdownMenu',
  mixins: [withapp, themeable, asthemecontext],
  provide () {
    return {
      NDropdownMenu: this
    }
  },
  inject: {
    NDropdownMenu: {
      default: null
    },
    NDropdownSubmenu: {
      default: null
    }
  },
  props: {
    type: {
      type: String,
      default: 'dropdown'
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: undefined
    },
    controller: {
      type: Object,
      default: null
    },
    submenuWidth: {
      type: Number,
      default: null
    },
    submenuMaxWidth: {
      type: Number,
      default: null
    },
    submenuMinWidth: {
      type: Number,
      default: null
    },
    focusable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      active: true,
      pendingSubmenuInstance: null,
      activeMenuInstance: this
    }
  },
  computed: {
    showAsMenuPopover () {
      if (this.NDropdownMenu) {
        return this.NDropdownMenu.showAsMenuPopover
      }
      return this.type === 'menu'
    },
    inheritedSubmenuWidth () {
      if (this.NDropdownMenu) {
        return this.NDropdownMenu.inheritedSubmenuWidth
      } else {
        return this.submenuWidth
      }
    },
    inheritedSubmenuMinWidth () {
      if (this.NDropdownMenu) {
        return this.NDropdownMenu.inheritedSubmenuMinWidth
      } else {
        return this.submenuMinWidth
      }
    },
    inheritedSubmenuMaxWidth () {
      if (this.NDropdownMenu) {
        return this.NDropdownMenu.inheritedSubmenuMaxWidth
      } else {
        return this.submenuMaxWidth
      }
    },
    options () {
      return []
    }
  },
  created () {
    console.log('dropdown menu created')
  },
  beforeDestroy () {
    console.log('dropdown menu beforeDestroy')
  },
  destroyed () {
    console.log('dropdown menu destroyed')
  },
  mounted () {
    console.log('dropdown menu mounted')
    if (this.autoFocus && this.focusable) {
      this.$el.focus()
    }
  },
  methods: {
    handleSelectItem (name) {
      /**
       * Can only be called at root level menu
       */
      this.controller.hide()
      this.$emit('select', name)
    },
    handleKeyDownLeft () {
      if (this.activeMenuInstance.NDropdownSubmenu) {
        this.activeMenuInstance.NDropdownSubmenu.menuActivated = false
        this.pendingSubmenuInstance = this.activeMenuInstance.NDropdownSubmenu
      }
      if (this.activeMenuInstance.NDropdownMenu) {
        this.activeMenuInstance = this.activeMenuInstance.NDropdownMenu
      }
    },
    handleKeyDownUp () {
      this.activeMenuInstance.$refs.selectMenu.prev()
    },
    handleKeyDownDown () {
      this.activeMenuInstance.$refs.selectMenu.next()
    },
    handleKeyDownRight () {
      if (
        this.pendingSubmenuInstance &&
        this.activeMenuInstance &&
        this.pendingSubmenuInstance !== this.activeMenuInstance.NDropdownSubmenu
      ) {
        this.pendingSubmenuInstance.menuActivated = true
        this.$nextTick().then(() => {
          this.activeMenuInstance = this.pendingSubmenuInstance.$refs.content
          this.$nextTick().then(() => {
            this.activeMenuInstance.$refs.selectMenu.next()
          })
        })
      }
    },
    handleKeyUpEnter () {
      if (this.activeMenuInstance) {
        if (this.activeMenuInstance.$refs.selectMenu) {
          const selectMenu = this.activeMenuInstance.$refs.selectMenu
          if (selectMenu.pendingOption) {
            this.$emit('select', selectMenu.pendingOption.name)
            this.controller.hide()
          }
        }
      }
    },
    handleKeyUp (e) {
      if (e.keyCode === 13) {
        this.handleKeyUpEnter()
      }
    },
    handleKeyDown (e) {
      if (!this.NDropdownMenu) {
        if (e.keyCode === 37) this.handleKeyDownLeft()
        if (e.keyCode === 38) this.handleKeyDownUp()
        if (e.keyCode === 39) this.handleKeyDownRight()
        if (e.keyCode === 40) this.handleKeyDownDown()
      }
    },
    handleBlur () {
      this.controller.hide()
      this.$emit('blur')
    },
    handleMouseEnter () {
      if (this.NDropdownMenu) {
        let rootDropdownMenu = this.NDropdownMenu
        while (rootDropdownMenu.NDropdownMenu) {
          rootDropdownMenu = rootDropdownMenu.NDropdownMenu
        }
        rootDropdownMenu.activeMenuInstance = this
      } else {
        this.activeMenuInstance = this
      }
    }
  },
  render (h) {
    const options = h(WrapWithValue, {
      scopedSlots: { ...this.$scopedSlots }
    })
    return h('div', {
      staticClass: 'n-dropdown-menu',
      class: {
        'n-dropdown-menu--as-menu-popover': this.showAsMenuPopover
      },
      on: {
        keydown: this.handleKeyDown,
        mouseenter: this.handleMouseEnter,
        blur: this.handleBlur,
        keyup: this.handleKeyUp
      }
    }, [
      h(NBaseSelectMenu, {
        ref: 'selectMenu',
        props: {
          withoutLightBar: this.showAsMenuPopover,
          withoutScrollbar: true,
          useSlot: !!this.$scopedSlots.default,
          options: this.options,
          size: this.size,
          isSelected: () => false,
          theme: this.synthesizedTheme,
          mirror: true
        },
        scopedSlots: {
          default () {
            return options
          }
        }
      })
    ])
  }
}
</script>
