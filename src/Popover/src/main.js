import NBaseContext from '../../_base/Context'
import NBasePortal from '../../_base/Portal'
import NPopoverContent from './PopoverContent'
import activatorMixin from './activatorMixin'

function createId () {
  return Math.random()
    .toString(36)
    .slice(2)
}

function mixin (component, mixins) {
  component.mixins = component.mixins || []
  component.mixins.push(mixins)
  return component
}

/**
 * When using `manual` trigger, using default param of v-model(value prop, input event)
 */
export default {
  name: 'NPopover',
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    delay: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 200
    },
    raw: {
      type: Boolean,
      default: false
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
    shadow: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    controller: {
      type: Object,
      default: null
    },
    containerClass: {
      type: String,
      default: 'n-popover'
    },
    overlayClass: {
      type: String,
      default: null
    },
    overlayStyle: {
      type: Object,
      default: null
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
    disabled: {
      type: Boolean,
      default: false
    },
    displayDirective: {
      type: String,
      default: 'if'
    },
    arrowStyle: {
      type: Object,
      default: null
    },
    zIndex: {
      type: String,
      default: undefined
    },
    theme: {
      validator (value) {
        return ['light', 'dark'].includes(value)
      },
      default: null
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const defaultSlot = slots.default && slots.default()
    const activatorSlot = (slots.activator && slots.activator()) || []
    let activatorVNode = activatorSlot[0]
    if (activatorVNode && !activatorVNode.tag) {
      activatorVNode = h('span', {
        staticClass: 'n-popover-text-wrapper'
      }, [activatorVNode])
    }
    const id = createId()
    const props = context.props
    const listeners = context.listeners
    const controller = context.props.controller
    return [
      h(mixin(NBaseContext, activatorMixin), {
        props: {
          ...props,
          controller,
          id
        }
      }, [activatorVNode]),
      h(NBasePortal, {}, [
        h(NPopoverContent, {
          props: {
            ...props,
            arrow: props.arrow === undefined ? props.showArrow : props.arrow,
            controller,
            id
          },
          on: listeners
        }, defaultSlot)
      ])
    ]
  }
}
