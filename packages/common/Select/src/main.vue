<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import NSelect from './BaseSelect'

export default {
  name: 'NSelect',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    value: {
      validator () {
        return true
      },
      required: false,
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
    emitOption: {
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
    remote: {
      type: Boolean,
      default: false
    },
    onSearch: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    noDataContent: {
      type: [String, Function],
      default: 'no data'
    },
    notFoundContent: {
      type: [String, Function],
      default: 'none result matched'
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    computedOptions () {
      if (this.options) return this.options
      else if (this.items) return this.items
      return []
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
    },
    handleScroll (e, scrollContainer, scrollContent) {
      this.$emit('scroll', e, scrollContainer, scrollContent)
    }
  },
  render (h) {
    const on = {
      input: this.handleInput.bind(this),
      change: this.handleChange.bind(this),
      setactive: this.handleSetActive.bind(this),
      scroll: this.handleScroll.bind(this)
    }
    return h(NSelect, {
      props: { ...this.$props, options: this.computedOptions, active: this.active, placement: 'bottom-start', widthMode: 'activator' },
      on
    })
  }
}
</script>
