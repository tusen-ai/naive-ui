<script>
export default {
  name: 'NBaseSelectOption',
  functional: true,
  inject: {
    NBaseSelectMenu: {
      default: null
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      validator () {
        return true
      },
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const SelectMenu = context.injections.NBaseSelectMenu
    let optionId = null
    if (SelectMenu && SelectMenu.value2Id) {
      optionId = SelectMenu.value2Id.get(context.props.value)
    }
    let id2Option = null
    if (SelectMenu && SelectMenu.id2Option) {
      id2Option = SelectMenu.id2Option
    }
    let option = null
    if (optionId !== null && id2Option !== null) {
      option = id2Option.get(optionId)
    }
    let isSelected = false
    if (SelectMenu && SelectMenu.isSelected && option) {
      isSelected = SelectMenu.isSelected(option)
    }
    const listeners = context.listeners || {}
    function handleClick (e) {
      SelectMenu.handleOptionClick(e, option)
      listeners.click && listeners.click(e)
    }
    function handleMouseEnter (e) {
      SelectMenu.handleOptionMouseEnter(e, option)
      listeners.mouseenter && listeners.mouseenter(e)
    }
    function handleMouseLeave (e) {
      SelectMenu.handleOptionMouseLeave(e, option)
      listeners.mouseleave && listeners.mouseleave(e)
    }
    let on = {}
    if (SelectMenu) {
      on = {
        click: handleClick,
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave
      }
    } else {
      on = listeners
    }
    let attrs = {}
    if (optionId !== null) {
      attrs = {
        'data-id': optionId
      }
    }
    return h('div', {
      staticClass: 'n-base-select-option',
      class: {
        'n-base-select-option--selected': isSelected,
        'n-base-select-option--disabled': context.props.disabled
      },
      key: context.props.value,
      attrs,
      on,
      props: {
        ...context.props
      }
    }, (context.scopedSlots.default && context.scopedSlots.default()) || [ context.props.label ])
  }
}
</script>
