import NBaseContext from '../../../base/Context'
import NBaseProtal from '../../../base/Protal'
import NPopoverContent from './PopoverContent'
import activatorMixin from './activatorMixin'
import genId from '../../../utils/genId'

function mixin (component, mixin) {
  component.mixins = component.mixins || []
  component.mixins.push(mixin)
  return component
}

/**
 * When using `manual` trigger, using default param of v-model(value prop, input event)
 */
export default {
  name: 'NPopover',
  functional: true,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: true
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 300
    },
    raw: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    controller: {
      type: Object,
      default: null
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const defaultSlot = slots.default && slots.default()
    const activatorSlot = slots.activator && slots.activator()
    const id = genId()
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
      }, [activatorSlot[0]]),
      h(NBaseProtal, {}, [
        h(NPopoverContent, {
          props: {
            ...props,
            controller,
            id
          },
          on: listeners
        }, defaultSlot)
      ])
    ]
  }
}
