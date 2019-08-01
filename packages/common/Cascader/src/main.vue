<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import Cascader from './Cascader'

export default {
  name: 'NCascader',
  model: {
    prop: 'selectedValue',
    event: 'input'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    selectedValue: {
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
      default: 'default'
    },
    verboseTransition: {
      type: Boolean,
      default: false
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
    return h(Cascader, {
      props: { ...this.$props, active: this.active, placement: 'bottom-start', widthMode: 'activator' },
      on
    })
  }
}
</script>
