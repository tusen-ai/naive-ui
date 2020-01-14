<script>
import {
  createValueAttribute
} from './utils'

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
      validator (value) {
        return typeof value === 'string'
      },
      required: true
    },
    value: {
      validator (value) {
        const type = typeof value
        return type === 'string' || type === 'number'
      },
      required: true
    },
    disabled: {
      validator (value) {
        return typeof value === 'boolean'
      },
      default: false
    },
    // payload: {
    //   validator (value) {
    //     return typeof value === 'string'
    //   },
    //   default: null
    // },
    isSelected: {
      validator (value) {
        return typeof value === 'boolean'
      },
      default: false
    }
    // mirror: {
    //   validator (value) {
    //     return typeof value === 'boolean'
    //   },
    //   default: true
    // }
  },
  render (h, context) {
    const option = {
      label: context.props.label,
      value: context.props.value,
      disabled: context.props.disabled
    }
    const selectMenu = context.injections.NBaseSelectMenu
    const disabled = context.props.disabled
    let selected = context.props.isSelected
    // if (context.props.mirror) {
    //   if (selectMenu && selectMenu.isSelected && option) {
    //     if (context.props.payload) {
    //       selected = selectMenu.isSelected({ value: context.props.value, payload: context.props.payload })
    //     } else {
    //       selected = selectMenu.isSelected({ value: context.props.value })
    //     }
    //   }
    // }
    const listeners = context.listeners || {}
    function handleClick (e) {
      if (disabled) return
      selectMenu.handleOptionClick(e, option)
      listeners.click && listeners.click(e)
    }
    function handleMouseEnter (e) {
      if (disabled) return
      selectMenu.handleOptionMouseEnter(e, option)
      listeners.mouseenter && listeners.mouseenter(e)
    }
    function handleMouseLeave (e) {
      if (disabled) return
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
    attrs = {
      'n-value': createValueAttribute(context.props.value)
    }
    return h('div', {
      staticClass: 'n-base-select-option',
      class: {
        'n-base-select-option--selected': selected,
        'n-base-select-option--disabled': disabled,
        ...context.data.class
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
