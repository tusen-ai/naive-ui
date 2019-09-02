<script>
import NPopover from '../../Popover'
import NPopselectPanel from './PopselectPanel'

export default {
  name: 'NPopselect',
  provide () {
    return {
      NPopselect: this
    }
  },
  functional: true,
  components: {
    NPopover,
    NPopselectPanel
  },
  props: {
    options: {
      type: Array,
      default: null
    },
    value: {
      validator () {
        return true
      },
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    controller: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleInput (v) {
      this.$emit('input', v)
    }
  },
  render (h, context) {
    const slots = context.slots()
    const controller = context.props.controller || {}
    return h(
      NPopover, {
        props: {
          inFunctionalComponent: true,
          trigger: 'click',
          controller
        }
      }, [
        h('template', {
          slot: 'activator'
        }, slots.activator),
        h(NPopselectPanel, {
          props: {
            ...context.props,
            controller
          },
          on: context.listeners
        }, slots.default)
      ])
  }
}
</script>
