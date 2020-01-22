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
    },
    arrow: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    }
  },
  methods: {
    handleInput (v) {
      this.$emit('input', v)
    }
  },
  render (h, context) {
    const slots = context.scopedSlots
    const activator = slots.activator || slots.default
    const controller = context.props.controller || {}
    const onHide = context.listeners.hide || (() => {})
    const onShow = context.listeners.show || (() => {})
    return h(NPopover, {
      props: {
        trigger: context.props.trigger,
        containerClass: 'n-popselect',
        arrow: context.props.arrow,
        controller
      },
      on: {
        show: onShow,
        hide: onHide
      },
      scopedSlots: {
        activator: () => activator(),
        default: () =>
          h(NPopselectPanel, {
            props: {
              ...context.props,
              controller
            },
            on: context.listeners
          })
      }
    })
  }
}
</script>
