<script>
import NPopover from '../../Popover'
import NDropdownMenu from './DropdownMenu'

export default {
  name: 'NDropdown',
  functional: true,
  props: {
    trigger: {
      validator (value) {
        return ['click', 'hover', 'manual'].includes(value)
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
    },
    value: {
      type: Boolean,
      default: false
    },
    manuallyPositioned: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: null
    },
    y: {
      type: Number,
      default: null
    },
    focusable: {
      type: Boolean,
      default: true
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activatorSlot = slots.activator && slots.activator()
    const controller = {}
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        placement: context.props.placement,
        widthMode: context.props.widthMode,
        duration: context.props.duration,
        width: context.props.width,
        minWidth: context.props.minWidth,
        maxWidth: context.props.maxWidth,
        value: context.props.value,
        manuallyPositioned: context.props.manuallyPositioned,
        x: context.props.x,
        y: context.props.y,
        arrow: false,
        raw: true,
        shadow: false,
        controller
      },
      scopedSlots: {
        activator () {
          return activatorSlot
        },
        default () {
          return h(NDropdownMenu, {
            attrs: {
              tabindex: context.props.focusable ? '0' : '-1'
            },
            props: {
              autoFocus: context.props.autoFocus,
              size: context.props.size,
              controller,
              submenuWidth: context.props.submenuWidth,
              focusable: context.props.focusable
            },
            on: {
              blur: context.listeners.blur || (() => {}),
              select: context.listeners.select || (() => {})
            },
            scopedSlots: { ...context.scopedSlots }
          })
        }
      },
      on: context.listeners
    })
  }
}
</script>
