import { h, ref, provide, getCurrentInstance, defineComponent } from 'vue'
import { NPopover } from '../../popover'
import NPopselectPanel from './PopselectPanel.vue'
import { omit, keep } from '../../_utils'
import { useTheme } from '../../_mixins'

const NPopselectPanelPropsKey = Object.keys(NPopselectPanel.props)

export default defineComponent({
  name: 'Popselect',
  props: {
    ...NPopover.props,
    ...useTheme.props,
    // eslint-disable-next-line vue/require-prop-types
    trigger: {
      ...NPopover.props.trigger,
      default: 'hover'
    },
    // eslint-disable-next-line vue/require-prop-types
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
})
