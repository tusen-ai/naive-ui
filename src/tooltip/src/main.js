// Tooltip: popover wearing waistcoat
import { NPopover } from '../../popover'
import { h } from 'vue'
import { withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'Tooltip',
  mixins: [
    withCssr(styles)
  ],
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
