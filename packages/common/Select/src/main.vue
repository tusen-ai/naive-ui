<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import NMultipleSelect from './MultipleSelect'
import NSingleSelect from './SingleSelect'

export default {
  name: 'NSelect',
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
    }
  },
  methods: {
    handleInput (...args) {
      console.log('input')
      this.$emit('input', ...args)
    },
    handleChange (...args) {
      this.$emit('change', ...args)
    }
  },
  render (h) {
    const on = {
      input: this.handleInput.bind(this),
      change: this.handleChange.bind(this)
    }
    return this.multiple ? h(NMultipleSelect, {
      props: this.$props,
      on
    }) : h(NSingleSelect, {
      props: this.$props,
      on
    })
  }
}
</script>
