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
  model: {
    prop: 'value',
    event: 'change'
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
    showArrow: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    zIndex: {
      type: Number,
      default: undefined
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
        showArrow: context.props.showArrow,
        zIndex: context.props.zIndex,
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
