<script>
import NBaseSelectOption from '../../../base/SelectMenu/src/SelectOption'

export default {
  props: {
    asSubmenu: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: undefined
    },
    value: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    NDropdownMenu: {
      default: null
    }
  },
  render (h) {
    return h(NBaseSelectOption, {
      props: {
        label: this.$scopedSlots.default ? '' : (this.label || this.name),
        value: this.value,
        isSelected: this.selected
      },
      class: {
        'n-dropdown-item': true,
        'n-dropdown-item--as-submenu': this.asSubmenu
      },
      scopedSlots: { ...this.$scopedSlots },
      on: {
        ...this.$listeners,
        click: (...args) => {
          if (this.$listeners.click) {
            this.$listeners.click(...args)
          }
          if (!this.asSubmenu) {
            if (this.NDropdownMenu) {
              let rootDropdownMenu = this.NDropdownMenu
              while (rootDropdownMenu.NDropdownMenu) {
                rootDropdownMenu = rootDropdownMenu.NDropdownMenu
              }
              rootDropdownMenu.handleSelectItem(this.name)
            }
          }
        }
      }
    })
  }
}
</script>
