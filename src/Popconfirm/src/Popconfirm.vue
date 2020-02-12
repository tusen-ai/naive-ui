<script>
import NPopover from '../../Popover'
import PopconfirmPanel from './PopconfirmPanel'

export default {
  name: 'NPopconfirm',
  functional: true,
  props: {
    ...NPopover.props,
    positiveText: {
      type: String,
      default: null
    },
    negativeText: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const controller = context.props.controller || {}
    return h(NPopover, {
      props: {
        ...context.props,
        controller,
        containerClass: 'n-popconfirm'
      },
      scopedSlots: {
        activator: () => slots.activator && slots.activator(),
        default: () => h(PopconfirmPanel, {
          props: {
            ...context.props,
            controller
          },
          on: context.listeners,
          scopedSlots: {
            action: () => slots.action && slots.action(),
            icon: () => slots.icon && slots.icon(),
            default: () => slots.default && slots.default()
          }
        })
      }
    })
  }
}
</script>
