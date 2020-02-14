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
    defaultFocus: {
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
    show: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  render (h, context) {
    const scopedSlots = context.scopedSlots
    const props = context.props
    const controller = {}
    return h(NPopover, {
      props: {
        trigger: props.trigger,
        placement: props.placement,
        widthMode: props.widthMode,
        duration: props.duration,
        width: props.width,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        show: props.show,
        manuallyPositioned: props.manuallyPositioned,
        x: props.x,
        y: props.y,
        arrow: false,
        raw: true,
        shadow: false,
        disabled: props.disabled,
        controller
      },
      scopedSlots: {
        activator: scopedSlots.default,
        default () {
          return h(NDropdownMenu, {
            attrs: {
              tabindex: props.focusable ? '0' : '-1'
            },
            props: {
              defaultFocus: props.defaultFocus,
              size: props.size,
              controller,
              submenuWidth: props.submenuWidth,
              focusable: props.focusable,
              options: props.options
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
