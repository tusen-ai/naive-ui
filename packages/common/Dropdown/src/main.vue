<script>
import NPopover from '../../Popover'
import NDropdownMenu from './DropdownMenu'

export default {
  name: 'NDropdown',
  functional: true,
  props: {
    trigger: {
      validator (trigger) {
        return ['click', 'hover'].includes(trigger)
      },
      default: 'click'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    widthMode: {
      type: String,
      default: 'activator'
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activatorSlot = slots.activator && slots.activator()
    const defaultSlot = slots.default && slots.default()
    const controller = {}
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        placement: context.props.placement,
        widthMode: context.props.widthMode,
        duration: context.props.duration,
        arrow: false,
        raw: true,
        controller: controller
      },
      scopedSlots: {
        activator () {
          return activatorSlot
        },
        default () {
          return h(NDropdownMenu, {
            props: {
              trigger: context.props.trigger,
              controller: controller
            }
          }, defaultSlot)
        }
      }
    })
  }
}
</script>
