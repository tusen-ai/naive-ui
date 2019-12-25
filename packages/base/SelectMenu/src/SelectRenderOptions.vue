<script>
import SelectOption from './SelectOption'

export default {
  name: 'NSelectRenderOptions',
  functional: true,
  inject: {
    NBaseSelectMenu: {
      default: null
    },
    mirror: {
      type: Boolean,
      default: true
    }
  },
  render (h, context) {
    if (context.props.mirror) {
      return context.children
    } else {
      const selectMenu = context.injections.NBaseSelectMenu
      const options = selectMenu && selectMenu.linkedOptions
      const isSelected = selectMenu.isSelected
      return options.map(option => {
        return h(SelectOption, {
          props: {
            label: option.label,
            value: option.value,
            isSelected: isSelected(option.value),
            mirror: false
          },
          scopedSlots: {
            default () {
              return option.children
            }
          }
        })
      })
    }
  }
}
</script>
