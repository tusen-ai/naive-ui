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
    },
    autoFocus: {
      type: Boolean,
      default: true
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activatorSlot = slots.activator && slots.activator()
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        placement: context.props.placement,
        widthMode: context.props.widthMode,
        duration: context.props.duration,
        arrow: false,
        raw: true
      },
      scopedSlots: {
        activator () {
          return activatorSlot
        },
        default () {
          return h(NDropdownMenu, {
            props: {
              autoFocus: context.props.autoFocus
            },
            scopedSlots: context.scopedSlots
          })
        }
      }
    })
  }
}
</script>
