/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../popover'

export default {
  name: 'Tooltip',
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
        overlayClass: 'n-tooltip-content ' + (context.props.overlayClass || '')
      },
      scopedSlots: {
        activator: () => slots.activator && slots.activator(),
        default: () => slots.default && slots.default()
      }
    })
  }
}
