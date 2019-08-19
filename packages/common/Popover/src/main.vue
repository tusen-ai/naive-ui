<script>
import Popover from './RawPopover'

const DEFAULT_DURATION = 200
const DEFAULT_DELAY = null

/**
 * When using `manual` trigger, using default param of v-model(value prop, input event)
 */
export default {
  name: 'NPopover',
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
      default: true,
      type: Boolean
    },
    raw: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
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
    },
    safeDelay () {
      return this.delay === null ? null : Number(this.delay)
    }
  },
  watch: {
    value (newValue) {
      if (newValue) {
        this.$emit('show')
      } else {
        this.$emit('hide')
      }
    }
  },
  methods: {
    deactivate () {
      this.active = false
      this.$emit('hide')
    },
    activate () {
      this.active = true
      this.$emit('show')
    },
    handleSetActive (active) {
      if (active) {
        if (!this.active) {
          this.$emit('show')
        }
      } else {
        if (this.active) {
          this.$emit('hide')
        }
      }
      this.active = active
    }
  },
  render (h) {
    const on = {
      setactive: this.handleSetActive.bind(this)
    }
    return h(Popover, {
      props: {
        ...this.$props,
        duration: this.safeDuration,
        delay: this.safeDelay,
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
