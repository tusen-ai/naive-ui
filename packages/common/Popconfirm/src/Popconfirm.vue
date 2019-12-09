<script>
import NPopover from '../../Popover'
import PopconfirmPanel from './PopconfirmPanel'

export default {
  name: 'NPopconfirm',
  functional: true,
  props: {
    positiveText: {
      type: String,
      default: 'Confirm'
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'click'
    },
    controller: {
      type: Object,
      default: null
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const controller = context.props.controller || {}
    return h(NPopover, {
      props: {
        ...context.props,
        controller,
        detachedContainerClass: 'n-popconfirm'
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
