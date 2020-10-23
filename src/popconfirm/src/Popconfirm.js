import { h, ref } from 'vue'
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
      default: undefined
    },
    negativeText: {
      type: String,
      default: undefined
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
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    }
  },
  setup () {
    return {
      popoverRef: ref(null)
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
      ref: 'popoverRef'
    },
    {
      trigger: slots.activator || slots.trigger,
      default: () => h(PopconfirmPanel, {
        ...keep(props, panelProps),
        onPositiveClick: () => {
          const {
            onPositiveClick = () => true,
            'onUpdate:show': onUpdateShow
          } = this
          Promise.resolve(
            onPositiveClick()
          ).then(value => {
            if (value === false) return
            this.popoverRef.setShow(false)
            onUpdateShow(false)
          })
        },
        onNegativeClick: () => {
          const {
            onNegativeClick = () => true,
            'onUpdate:show': onUpdateShow
          } = this
          Promise.resolve(
            onNegativeClick()
          ).then(value => {
            if (value === false) return
            this.popoverRef.setShow(false)
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
