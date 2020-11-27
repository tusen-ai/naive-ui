import { h } from 'vue'
import NPopover from '../../popover'
import NPopselectPanel from './PopselectPanel.vue'
import { omit, keep } from '../../_utils'

const NPopselectPanelPropsKey = Object.keys(NPopselectPanel.props)

export default {
  name: 'Popselect',
  provide () {
    return {
      NPopselect: this
    }
  },
  props: {
    ...NPopover.props,
    trigger: {
      ...NPopover.props.trigger,
      default: 'hover'
    },
    showArrow: {
      ...NPopover.props.showArrow,
      default: false
    },
    ...NPopselectPanel.props
  },
  methods: {
    syncPosition () {
      this.$refs.popover.syncPosition()
    },
    setShow (value) {
      this.$refs.popover.setShow(value)
    }
  },
  render () {
    return h(NPopover, omit(
      this.$props,
      NPopselectPanelPropsKey,
      {
        bodyStyle: {
          padding: 0
        },
        containerClass: 'n-popselect',
        ref: 'popover'
      }
    ), {
      trigger: this.$slots.default,
      default: () => {
        return h(NPopselectPanel, keep(
          this.$props,
          NPopselectPanelPropsKey
        ))
      }
    })
  }
}
