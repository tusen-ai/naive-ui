/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../Popover'

export default {
  name: 'NTooltip',
  functional: true,
  props: {
    ...NPopover.props,
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    return h(NPopover, {
      on: context.listeners,
      props: {
        ...context.props,
        containerClass: 'n-tooltip',
        overlayClass: 'n-tooltip-content'
      },
      scopedSlots: {
        activator: () => slots.activator && slots.activator(),
        default: () => slots.default && slots.default()
      }
    })
  }
}
