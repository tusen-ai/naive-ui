/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../popover'
import { h } from 'vue'

// export default {
//   name: 'Tooltip',
//   props: {
//     ...NPopover.props,
//     showArrow: {
//       type: Boolean,
//       default: false
//     }
//   },
//   render () {
//     const slots = this.$slots
//     return h(NPopover, {
//       on: this.$listeners,
//       props: {
//         ...this.$props,
//         containerClass: 'n-tooltip',
//         overlayClass: 'n-tooltip-content ' + (this.$props.overlayClass || '')
//       },
//       scopedSlots: {
//         activator: () => slots.activator && slots.activator(),
//         default: () => slots.default && slots.default()
//       }
//     })
//   }
// }

export default {
  name: 'Tooltip',
  render () {
    return this.$slots.activator()
  }
}
