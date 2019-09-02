<script>
import NPopover from '../../Popover'
import PopconfirmPanel from './PopconfirmPanel'

export default {
  name: 'NPopconfirm',
  functional: true,
  props: {
    positiveText: {
      type: String,
      default: 'Confirm'
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    inFunctionalComponent: {
      type: Boolean,
      default: true
    },
    controller: {
      type: Object,
      default: null
    }
  },
  render (h, context) {
    const controller = context.props.controller || {}
    return h(NPopover, {
      props: {
        ...context.props,
        controller
      }
    }, [
      h('template', {
        slot: 'activator'
      }, context.slots().activator),
      h(PopconfirmPanel, {
        props: {
          ...context.props,
          controller
        },
        on: context.listeners
      }, [
        h('template', {
          slot: 'action'
        }, context.slots().action),
        h('template', {
          slot: 'icon'
        }, context.slots().icon),
        context.slots().default
      ])
    ])
  }
}
</script>
