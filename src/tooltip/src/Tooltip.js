// Tooltip: popover wearing waistcoat
import { NPopover } from '../../popover'
import { h } from 'vue'
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'Tooltip',
  mixins: [configurable, themeable, withCssr(styles)],
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
    return h(
      NPopover,
      {
        ...this.$props,
        class: 'n-tooltip n-popover--tooltip',
        ref: 'popover'
      },
      {
        ...this.$slots
      }
    )
  }
}
