/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../popover/src/Popover'
import { h } from 'vue'

export default {
  name: 'Tooltip',
  props: {
    ...NPopover.props,
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    syncPosition () {
      this.$refs.popover.syncPosition()
    }
  },
  render () {
    return h(NPopover, {
      ...this.$props,
      containerClass: 'n-tooltip',
      bodyClass: 'n-tooltip-body ' + (this.$props.bodyClass || ''),
      ref: 'popover'
    }, {
      ...this.$slots
    })
  }
}
