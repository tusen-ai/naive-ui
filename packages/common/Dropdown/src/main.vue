<script>
import NPopover from '../../Popover'
import NDropdownMenu from './DropdownMenu'

export default {
  name: 'NDropdown',
  functional: true,
  props: {
    trigger: {
      validator (value) {
        return ['click', 'hover'].includes(value)
      },
      default: 'click'
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'large'
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
    },
    width: {
      type: Number,
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    submenuWidth: {
      type: Number,
      default: null
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activatorSlot = slots.activator && slots.activator()
    const controller = {}
    console.log(context.props)
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        placement: context.props.placement,
        widthMode: context.props.widthMode,
        duration: context.props.duration,
        width: context.props.width,
        minWidth: context.props.minWidth,
        maxWidth: context.props.maxWidth,
        arrow: false,
        raw: true,
        controller
      },
      scopedSlots: {
        activator () {
          return activatorSlot
        },
        default () {
          return h(NDropdownMenu, {
            props: {
              autoFocus: context.props.autoFocus,
              size: context.props.size,
              controller,
              submenuWidth: context.props.submenuWidth
            },
            on: {
              select: context.listeners.select || (() => {})
            },
            scopedSlots: context.scopedSlots
          })
        }
      }
    })
  }
}
</script>
