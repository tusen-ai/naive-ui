<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import WrapWithValue from './WrapWithValue'
import {
  NBaseSelectMenu,
  NBaseSelectOptionCollector,
  NBaseSelectRenderOptions
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
      collectedOptions: [],
      pendingSubMenuInstance: null,
      activeMenuInstance: this
    }
  },
  computed: {
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
      return this.collectedOptions
    }
  },
  mounted () {
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
        this.pendingSubMenuInstance = this.activeMenuInstance.NDropdownSubmenu
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
        this.pendingSubMenuInstance &&
        this.activeMenuInstance &&
        this.pendingSubMenuInstance !== this.activeMenuInstance.NDropdownSubmenu
      ) {
        this.pendingSubMenuInstance.menuActivated = true
        this.$nextTick().then(() => {
          this.activeMenuInstance = this.pendingSubMenuInstance.$refs.content
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
      on: {
        keydown: this.handleKeyDown,
        mouseenter: this.handleMouseEnter,
        blur: this.handleBlur,
        keyup: this.handleKeyUp
      }
    }, [
      h(NBaseSelectOptionCollector, {
        scopedSlots: {
          default () {
            return options
          }
        }
      }),
      h(NBaseSelectMenu, {
        ref: 'selectMenu',
        props: {
          withoutScrollbar: true,
          useSlot: !!this.$scopedSlots.default,
          isSelected: () => false,
          options: this.options,
          size: this.size,
          theme: this.synthesizedTheme
        }
      }, [
        h(NBaseSelectRenderOptions, {
          scopedSlots: {
            default () {
              return options
            }
          }
        })
      ])
    ])
  }
}
</script>
