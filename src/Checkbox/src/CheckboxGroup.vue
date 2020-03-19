<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NCheckboxGroup',
  mixins: [
    withapp,
    themeable,
    asformitem()
  ],
  provide () {
    return {
      NFormItem: null,
      NCheckboxGroup: this
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
    },
    value: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collectedCheckboxValues: []
    }
  },
  computed: {
    valueAsSet () {
      if (Array.isArray(this.value)) return new Set(this.value)
      return null
    }
  },
  methods: {
    toggleCheckbox (checked, checkboxValue) {
      if (Array.isArray(this.value)) {
        let groupValue = Array.from(this.value)
        const collectedCheckboxValues = new Set(this.collectedCheckboxValues)
        groupValue = groupValue.filter(value => collectedCheckboxValues.has(value))
        const index = groupValue.findIndex(value => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            this.$emit('change', groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            this.$emit('change', groupValue)
          }
        }
      } else {
        if (checked) {
          this.$emit('change', [checkboxValue])
        } else {
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
