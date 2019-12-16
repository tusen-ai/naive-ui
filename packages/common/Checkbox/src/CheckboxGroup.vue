<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import asformitem from '../../../mixins/asformitem'

export default {
  name: 'NCheckboxGroup',
  mixins: [
    withapp,
    themeable,
    asthemecontext,
    asformitem()
  ],
  provide () {
    return {
      NFormItem: null,
      NCheckboxGroup: this
    }
  },
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      collectedCheckboxValues: []
    }
  },
  watch: {
    value (value, oldValue) {
      this.$emit('change', value, oldValue)
    }
  },
  methods: {
    toggleCheckbox (checked, checkboxValue) {
      if (Array.isArray(this.value)) {
        let groupValue = Array.from(this.value)
        groupValue = groupValue.filter(value => ~this.collectedCheckboxValues.findIndex(collectedCheckboxValue => collectedCheckboxValue === value))
        const index = groupValue.findIndex(value => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            this.$emit('input', groupValue)
            this.$emit('change', groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            this.$emit('input', groupValue)
            this.$emit('change', groupValue)
          }
        }
      } else {
        if (checked) {
          this.$emit('input', [checkboxValue])
          this.$emit('change', [checkboxValue])
        } else {
          this.$emit('input', [])
          this.$emit('change', [])
        }
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-checkbox-group'
    }, this.$slots.default)
  }
}
</script>
