import { h, ref, defineComponent, provide, getCurrentInstance } from 'vue'
import { NPopover } from '../../popover'
import { omit, keep } from '../../_utils'
import { useTheme } from '../../_mixins'
import { popconfirmLight } from '../styles'
import PopconfirmPanel from './PopconfirmPanel.vue'
import style from './styles/index.cssr.js'

const panelProps = Object.keys(PopconfirmPanel.props)

export default defineComponent({
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
  setup (props) {
    const themeRef = useTheme(
      'Popconfirm',
      'Popconfirm',
      style,
      popconfirmLight,
      props
    )
    provide('NPopconfirm', getCurrentInstance().proxy)
    return {
      mergedTheme: themeRef,
      popoverRef: ref(null)
    }
  },
  render () {
    const { $slots: slots, $props: props, mergedTheme } = this
    return h(
      NPopover,
      {
        ...omit(props, panelProps, {
          unstableTheme: mergedTheme.peers.Popover,
          unstableThemeOverrides: mergedTheme.overrides.Popover
        }),
        class: 'n-popconfirm',
        ref: 'popoverRef'
      },
      {
        trigger: slots.activator || slots.trigger,
        default: () =>
          h(
            PopconfirmPanel,
            {
              ...keep(props, panelProps),
              onPositiveClick: () => {
                const {
                  onPositiveClick = () => true,
                  'onUpdate:show': onUpdateShow
                } = this
                Promise.resolve(onPositiveClick()).then((value) => {
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
                Promise.resolve(onNegativeClick()).then((value) => {
                  if (value === false) return
                  this.popoverRef.setShow(false)
                  onUpdateShow(false)
                })
              }
            },
            {
              action: slots.action,
              icon: slots.icon,
              default: slots.default
            }
          )
      }
    )
  }
})
