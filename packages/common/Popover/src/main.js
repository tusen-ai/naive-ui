import NBaseContext from '../../../base/Context'
import NBaseProtal from '../../../base/Protal'
import NPopoverContent from './PopoverContent'
import activatorMixin from './activatorMixin'
import contentMixin from './contentMixin'
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
  render (h, context) {
    const slots = context.slots()
    const activatorSlot = slots.activator || []
    const defaultSlot = slots.default || []
    const id = genId()
    const trigger = context.props.trigger || 'hover'
    const show = context.props.show || false
    return [
      h(mixin(NBaseContext, activatorMixin), {
        props: {
          id,
          trigger,
          show
        }
      }, [activatorSlot[0]]),
      h(mixin(NBaseProtal, contentMixin), {
        props: { id }
      }, [
        h(NPopoverContent, {
          props: {
            id,
            trigger,
            show
          }
        }, defaultSlot)
      ])
    ]
  }
}
