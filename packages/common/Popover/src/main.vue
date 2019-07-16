<script>
import Popover from './RawPopover'

const DEFAULT_DURATION = 200

export default {
  name: 'NPopover',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: DEFAULT_DURATION,
      /**
       * make sure it is a number...
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
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    safeDuration () {
      return Number(this.duration)
    }
  },
  methods: {
    handleInput (active) {
      this.active = active
    }
  },
  render (h) {
    const on = {
      input: this.handleInput.bind(this)
    }
    return h(Popover, {
      props: {
        ...this.$props,
        duration: this.safeDuration,
        active: this.$props.trigger === 'manual' ? this.value : this.active
      },
      on
    }, [
      h('template', {
        slot: 'activator'
      }, [this.$slots.activator]),
      this.$slots.default
    ])
  }
}
</script>
