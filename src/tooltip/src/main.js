/**
 * Tooltip: popover wearing waistcoat
 */
import { NPopover } from '../../popover'
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
      bodyClass: 'n-tooltip n-popover--tooltip' + (this.$props.bodyClass || ''),
      ref: 'popover'
    }, {
      ...this.$slots
    })
  }
}
