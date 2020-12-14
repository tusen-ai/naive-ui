import { h, ref, provide, getCurrentInstance } from 'vue'
import { NPopover } from '../../popover'
import NPopselectPanel from './PopselectPanel.vue'
import { omit, keep } from '../../_utils'

const NPopselectPanelPropsKey = Object.keys(NPopselectPanel.props)

export default {
  name: 'Popselect',
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
  setup () {
    provide('NPopselect', getCurrentInstance().proxy)
    const popoverRef = ref(null)
    return {
      popoverRef,
      syncPosition () {
        popoverRef.value.syncPosition?.()
      },
      setShow (value) {
        popoverRef.value.setShow?.(value)
      }
    }
  },
  render () {
    return h(
      NPopover,
      omit(this.$props, NPopselectPanelPropsKey, {
        raw: true,
        ref: 'popoverRef',
        class: 'n-popselect'
      }),
      {
        trigger: this.$slots.default,
        default: () => {
          return h(NPopselectPanel, keep(this.$props, NPopselectPanelPropsKey))
        }
      }
    )
  }
}
