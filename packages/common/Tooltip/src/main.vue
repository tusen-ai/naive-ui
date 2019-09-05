<script>
/**
 * Tooltip: popover wearing waistcoat
 */
import NPopover from '../../Popover'

const DEFAULT_DURATION = 200
const DEFAULT_DELAY = null

export default {
  name: 'NTooltip',
  functional: true,
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    value: {
      type: Boolean,
      default: false
    },
    delay: {
      type: [String, Number],
      default: DEFAULT_DELAY
    },
    duration: {
      type: [String, Number],
      default: DEFAULT_DURATION,
      /**
       * make sure it is a positive number...
       */
      validator (value) {
        value = Number(value)
        if (Number.isNaN(value)) {
          return false
        } else {
          return value > 0
        }
      }
    },
    trigger: {
      default: 'hover',
      validator (value) {
        return ['click', 'hover', 'manual'].includes(value)
      }
    },
    arrow: {
      default: false,
      type: Boolean
    },
    width: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    }
  },
  render (h, context) {
    return h(NPopover, {
      on: context.listeners,
      props: {
        ...context.props,
        inFunctionalComponent: true
      }
    }, [
      h('template', {
        slot: 'activator'
      }, context.scopedSlots.activator()),
      h('div', {
        staticClass: 'n-tooltip__content',
        class: {
          'n-tooltip__content--fix-width': context.props.width !== null || context.props.maxWidth !== null
        }
      }, context.scopedSlots.default())
    ])
  }
}
</script>
