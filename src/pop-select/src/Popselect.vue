<script>
import NPopover from '../../Popover'
import NPopselectPanel from './PopselectPanel'
import emptyFunction from '../../_utils/function/empty'

export default {
  name: 'Popselect',
  provide () {
    return {
      NPopselect: this
    }
  },
  functional: true,
  components: {
    NPopover,
    NPopselectPanel
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...NPopover.props,
    options: {
      type: Array,
      default: null
    },
    value: {
      validator () {
        return true
      },
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'small'
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activator = slots.activator || slots.default
    const controller = context.props.controller || {}
    const handleHide = context.listeners.hide || emptyFunction
    const handleShow = context.listeners.show || emptyFunction
    const handleChange = context.listeners.change || emptyFunction
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        containerClass: 'n-popselect',
        showArrow: context.props.showArrow,
        zIndex: context.props.zIndex,
        overlayStyle: {
          padding: 0
        },
        controller
      },
      on: {
        show: handleShow,
        hide: handleHide
      },
      scopedSlots: {
        activator: () => activator(),
        default: () =>
          h(NPopselectPanel, {
            props: {
              ...context.props,
              controller
            },
            on: {
              change: handleChange
            }
          })
      }
    })
  }
}
</script>
