<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import { getRootDropdownMenu, createSelectOptions } from './utils'
import { KEY_CODE } from '../../_utils/event/keyCode'
import keyboardDelegate from '../../_utils/delegate/keyboardDelegate'
import NBaseSelectMenu from '../../_base/select-menu'

export default {
  name: 'NDropdownMenu',
  mixins: [ withapp, themeable ],
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
    options: {
      type: Array,
      required: true
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
    keyboard: {
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
    selectOptions () {
      return createSelectOptions(this.options)
    },
    inheritedTheme () {
      if (this.NDropdownMenu) {
        return this.NDropdownMenu.inheritedTheme
      } else {
        return this.syntheticTheme
      }
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
    }
  },
  mounted () {
    if (this.keyboard) this.registerKeyboardOperations()
  },
  beforeDestroy () {
    if (this.keyboard) this.unregisterKeyboardOperations()
  },
  methods: {
    registerKeyboardOperations () {
      keyboardDelegate.registerHandler(KEY_CODE.UP, 'keydown', this.handleKeyDownUp, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.RIGHT, 'keydown', this.handleKeyDownRight, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.DOWN, 'keydown', this.handleKeyDownDown, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.LEFT, 'keydown', this.handleKeyDownLeft, {
        preventDefault: true
      })
      keyboardDelegate.registerHandler(KEY_CODE.ENTER, 'keyup', this.handleKeyUpEnter)
    },
    unregisterKeyboardOperations () {
      keyboardDelegate.unregisterHandler(this.handleKeyDownUp)
      keyboardDelegate.unregisterHandler(this.handleKeyDownDown)
      keyboardDelegate.unregisterHandler(this.handleKeyDownLeft)
      keyboardDelegate.unregisterHandler(this.handleKeyDownRight)
      keyboardDelegate.unregisterHandler(this.handleKeyUpEnter)
    },
    handleKeyDownEnter () {},
    handleSelectOption (key) {
      if (this.NDropdownMenu) {
        this.NDropdownMenu.handleSelectOption(key)
        return
      }
      this.controller.hide()
      this.$emit('select', key)
    },
    handleKeyDownLeft () {
      if (!this.NDropdownMenu) {
        if (this.activeMenuInstance.NDropdownSubmenu) {
          this.activeMenuInstance.NDropdownSubmenu.menuActivated = false
          this.pendingSubmenuInstance = this.activeMenuInstance.NDropdownSubmenu
        }
        if (this.activeMenuInstance.NDropdownMenu) {
          this.activeMenuInstance = this.activeMenuInstance.NDropdownMenu
        }
      }
    },
    handleKeyDownUp () {
      if (!this.NDropdownMenu) {
        this.activeMenuInstance.$refs.selectMenu.prev()
      }
    },
    handleKeyDownDown () {
      if (!this.NDropdownMenu) {
        this.activeMenuInstance.$refs.selectMenu.next()
      }
    },
    handleKeyDownRight () {
      if (!this.NDropdownMenu) {
        if (
          this.pendingSubmenuInstance &&
          this.activeMenuInstance &&
          this.pendingSubmenuInstance !== this.activeMenuInstance.NDropdownSubmenu
        ) {
          this.pendingSubmenuInstance.menuActivated = true
          this.$nextTick().then(() => {
            this.activeMenuInstance = this.pendingSubmenuInstance.$refs.menu
            this.$nextTick().then(() => {
              this.activeMenuInstance.$refs.selectMenu.next()
            })
          })
        }
      }
    },
    handleKeyUpEnter () {
      if (this.activeMenuInstance) {
        if (this.activeMenuInstance.$refs.selectMenu) {
          const selectMenu = this.activeMenuInstance.$refs.selectMenu
          if (selectMenu.pendingOptionValue) {
            this.$emit('select', selectMenu.pendingOptionValue)
            this.controller.hide()
          }
        }
      }
    },
    handleMouseEnter () {
      if (this.NDropdownMenu) {
        const rootDropdownMenu = getRootDropdownMenu(this)
        rootDropdownMenu.activeMenuInstance = this
      } else {
        this.activeMenuInstance = this
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-dropdown-menu',
      class: {
        [`n-dropdown-menu--${this.size}-size`]: true
      },
      on: {
        mouseenter: this.handleMouseEnter
      }
    }, [
      h(NBaseSelectMenu, {
        ref: 'selectMenu',
        props: {
          virtualScroll: false,
          scrollable: false,
          options: this.selectOptions,
          size: this.size,
          isOptionSelected: () => false,
          theme: this.inheritedTheme
        },
        style: {
          overflow: 'visible'
        },
        on: {
          'menu-toggle-option': option => {
            this.handleSelectOption(option.value)
          }
        }
      })
    ])
  }
}
</script>
