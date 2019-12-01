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
    options () {
      return this.collectedOptions
    }
  },
  mounted () {
    if (this.autoFocus) {
      this.$el.focus()
    }
  },
  methods: {
    handleKeyDownLeft () {
      if (this.activeMenuInstance.NDropdownSubmenu) {
        this.activeMenuInstance.NDropdownSubmenu.menuActivated = false
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
          this.activeMenuInstance = this.pendingSubMenuInstance.$refs.dropdownMenu
          this.$nextTick().then(() => {
            this.activeMenuInstance.$refs.selectMenu.next()
          })
        })
      }
    },
    handleKeyDown (e) {
      if (e.keyCode === 37) this.handleKeyDownLeft()
      if (e.keyCode === 38) this.handleKeyDownUp()
      if (e.keyCode === 39) this.handleKeyDownRight()
      if (e.keyCode === 40) this.handleKeyDownDown()
    }
  },
  render (h) {
    const options = h(WrapWithValue, {
      scopedSlots: this.$scopedSlots
    })
    return h('div', {
      staticClass: 'n-dropdown-menu',
      on: {
        keydown: this.handleKeyDown
      },
      attrs: {
        tabindex: '0'
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
          size: 'medium',
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
