import { h } from 'vue'
import NPopover from '../../popover'
import PopconfirmPanel from './PopconfirmPanel.vue'
import { omit, keep } from '../../_utils/vue'

const panelProps = [
  'positiveText',
  'negativeText',
  'showIcon',
  'onPositiveClick',
  'onNegativeClick'
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
    onPositiveClick: {
      type: Function,
      default: () => true
    },
    onNegativeClick: {
      type: Function,
      default: () => true
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
            'onUpdate:show': onUpdateShow
          } = this
          Promise.resolve(
            onPositiveClick()
          ).then(value => {
            if (!value) return
            this.$refs.popover.setShow(false)
            onUpdateShow(false)
          })
        },
        onNegativeClick: () => {
          const {
            onNegativeClick,
            'onUpdate:show': onUpdateShow
          } = this
          Promise.resolve(
            onNegativeClick()
          ).then(value => {
            if (!value) return
            this.$refs.popover.setShow(false)
            onUpdateShow(false)
          })
        }
      }, {
        action: slots.action,
        icon: slots.icon,
        default: slots.default
      })
    })
  }
}
