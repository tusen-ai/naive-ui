<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import { getRootDropdownMenu, createSelectOptions } from './utils'
import { KEY_CODE } from '../../_utils/event/keyCode'
import NBaseSelectMenu from '../../_base/SelectMenu'

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
    defaultFocus: {
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
    selectOptions () {
      return createSelectOptions(this.options)
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
    if (this.defaultFocus && this.focusable) {
      this.$el.focus()
    }
  },
  methods: {
    handleSelectOption (key) {
      if (this.NDropdownMenu) {
        this.NDropdownMenu.handleSelectOption(key)
        return
      }
      this.controller.hide()
      this.$emit('select', key)
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
          if (selectMenu.pendingOptionValue) {
            this.$emit('select', selectMenu.pendingOptionValue)
            this.controller.hide()
          }
        }
      }
    },
    handleKeyUp (e) {
      if (e.keyCode === KEY_CODE.ENTER) {
        this.handleKeyUpEnter()
      }
    },
    handleKeyDown (e) {
      if (!this.NDropdownMenu) {
        switch (e.keyCode) {
          case KEY_CODE.UP:
            this.handleKeyDownUp()
            break
          case KEY_CODE.RIGHT:
            this.handleKeyDownRight()
            break
          case KEY_CODE.DOWN:
            this.handleKeyDownDown()
            break
          case KEY_CODE.LEFT:
            this.handleKeyDownLeft()
            break
          default:
            break
        }
      }
    },
    handleBlur () {
      this.controller.hide()
      this.$emit('blur')
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
        keydown: this.handleKeyDown,
        mouseenter: this.handleMouseEnter,
        blur: this.handleBlur,
        keyup: this.handleKeyUp
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
          theme: this.syntheticTheme
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
