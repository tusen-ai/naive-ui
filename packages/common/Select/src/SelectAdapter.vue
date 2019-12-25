<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import NSelect from './Select'

export default {
  name: 'NSelect',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    clearable: {
      type: Boolean,
      default: undefined
    },
    items: {
      type: Array,
      default: undefined
    },
    options: {
      type: Array,
      default: undefined
    },
    value: {
      validator () {
        return true
      },
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    emitOption: {
      type: Boolean,
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: undefined
    },
    filter: {
      type: Function,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: undefined
    },
    remote: {
      type: Boolean,
      default: undefined
    },
    onSearch: {
      type: Function,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    noDataContent: {
      type: [String, Function],
      default: undefined
    },
    notFoundContent: {
      type: [String, Function],
      default: undefined
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
    handleScroll (e, scrollContainer, scrollContent) {
      this.$emit('scroll', e, scrollContainer, scrollContent)
    }
  },
  render (h) {
    const on = {
      input: this.handleInput.bind(this),
      change: this.handleChange.bind(this),
      scroll: this.handleScroll.bind(this)
    }
    return h(NSelect, {
      props: { ...this.$props, options: this.computedOptions, placement: 'bottom-start', widthMode: 'activator', useSlot: !!this.$scopedSlots.default },
      on,
      scopedSlots: { ...this.$scopedSlots }
    })
  }
}
</script>
