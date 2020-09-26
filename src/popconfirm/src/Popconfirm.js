import { h } from 'vue'
import NPopover from '../../popover'
import PopconfirmPanel from './PopconfirmPanel'
import { omit, keep } from '../../_utils/vue'

const panelProps = [
  'positiveText',
  'negativeText',
  'showIcon',
  'onPositiveClick',
  'onNegativeClick',
  'leaveOnNegativeClick',
  'leaveOnPositiveClick'
]

export default {
  name: 'Popconfirm',
  props: {
    ...NPopover.props,
    positiveText: {
      type: String,
      default: null
    },
    negativeText: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'click'
    },
    leaveOnPositiveClick: {
      type: Boolean,
      default: true
    },
    leaveOnNegativeClick: {
      type: Boolean,
      default: true
    },
    onPositiveClick: {
      type: Function,
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    }
  },
  render () {
    const {
      $slots: slots,
      $props: props
    } = this
    return h(NPopover, {
      ...omit(props, panelProps),
      containerClass: 'n-popconfirm',
      ref: 'popover'
    },
    {
      trigger: slots.activator || slots.trigger,
      default: () => h(PopconfirmPanel, {
        ...keep(props, panelProps),
        onPositiveClick: () => {
          const {
            onPositiveClick,
            leaveOnPositiveClick,
            'onUpdate:show': onUpdateShow
          } = this
          if (onPositiveClick) onPositiveClick()
          if (leaveOnPositiveClick) {
            this.$refs.popover.setShow(false)
            onUpdateShow(false)
          }
        },
        onNegativeClick: () => {
          const {
            onNegativeClick,
            leaveOnNegativeClick,
            'onUpdate:show': onUpdateShow
          } = this
          if (onNegativeClick) onNegativeClick()
          if (leaveOnNegativeClick) {
            this.$refs.popover.setShow(false)
            onUpdateShow(false)
          }
        }
      }, {
        action: slots.action,
        icon: slots.icon,
        default: slots.default
      })
    })
  }
}
