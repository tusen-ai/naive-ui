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
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    mirror: {
      type: Boolean,
      default: true
    }
  },
  render (h, context) {
    const option = {
      label: context.props.label,
      value: context.props.value
    }
    const selectMenu = context.injections.NBaseSelectMenu
    let optionId = context.props.value
    let isSelected = context.props.isSelected
    if (context.props.mirror) {
      if (selectMenu && selectMenu.isSelected && option) {
        isSelected = selectMenu.isSelected({ value: context.props.value })
      }
    }
    const listeners = context.listeners || {}
    function handleClick (e) {
      selectMenu.handleOptionClick(e, option)
      listeners.click && listeners.click(e)
    }
    function handleMouseEnter (e) {
      selectMenu.handleOptionMouseEnter(e, option)
      listeners.mouseenter && listeners.mouseenter(e)
    }
    function handleMouseLeave (e) {
      selectMenu.handleOptionMouseLeave(e, option)
      listeners.mouseleave && listeners.mouseleave(e)
    }
    let on = {}
    if (selectMenu) {
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
