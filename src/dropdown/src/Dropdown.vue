<script>
import NPopover from '../../popover'
import NDropdownMenu from './DropdownMenu.vue'

export default {
  name: 'Dropdown',
  functional: true,
  props: {
    ...NPopover.props,
    keyboard: {
      type: Boolean,
      default: true
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'large'
    },
    submenuWidth: {
      type: Number,
      default: null
    },
    submenuMinWidth: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    controller: {
      type: Object,
      default: () => ({})
    },
    theme: {
      validator (value) {
        return ['light', 'dark'].includes(value)
      },
      default: null
    }
  },
  render (h, context) {
    const scopedSlots = context.scopedSlots
    const props = context.props
    return h(NPopover, {
      props: {
        ...props,
        arrow: false,
        raw: true,
        shadow: false
      },
      scopedSlots: {
        activator: scopedSlots.default,
        default () {
          return h(NDropdownMenu, {
            props: {
              controller: props.controller,
              size: props.size,
              submenuWidth: props.submenuWidth,
              submenuMinWidth: props.submenuMinWidth,
              options: props.options,
              keyboard: props.keyboard,
              theme: props.theme
            },
            on: {
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
