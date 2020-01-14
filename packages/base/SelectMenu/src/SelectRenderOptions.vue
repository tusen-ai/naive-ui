<script>
import SelectOption from './SelectOption.vue'

export default {
  name: 'NSelectRenderOptions',
  functional: true,
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  render (h, context) {
    const selectMenu = context.injections.NBaseSelectMenu
    const options = selectMenu && selectMenu.linkedOptions
    const isSelected = selectMenu.isSelected
    return options.map(option => {
      return h(SelectOption, {
        props: {
          label: option.label,
          value: option.value,
          disabled: option.disabled,
          isSelected: isSelected({ value: option.value }),
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
</script>
