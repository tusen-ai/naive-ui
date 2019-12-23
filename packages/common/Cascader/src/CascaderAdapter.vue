<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import BaseCascader from './Cascader'

export default {
  name: 'NCascader',
  props: {
    options: {
      type: Array,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: 'Please Select'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    emitItem: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: true
    },
    all: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    filter: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    handleInput (...args) {
      this.$emit('input', ...args)
    },
    handleChange (...args) {
      this.$emit('change', ...args)
    },
    handleSetActive (active) {
      this.active = active
    }
  },
  render (h) {
    const on = {
      input: this.handleInput.bind(this),
      change: this.handleChange.bind(this),
      setactive: this.handleSetActive.bind(this)
    }
    return h(BaseCascader, {
      props: { ...this.$props, enableAllOptions: !this.$props.leafOnly, active: this.active, placement: 'bottom-start' },
      on
    })
  }
}
</script>
