<script>
import { h } from 'vue'
import NFormItem from './FormItem'
import NCol from '../../grid/src/Col'

export default {
  name: 'FormItemCol',
  props: {
    ...NCol.props,
    ...NFormItem.props
  },
  methods: {
    validate (...args) {
      if (this.$refs.formItem) {
        return this.$refs.formItem.validate(...args)
      }
    },
    clearValidationEffect (...args) {
      if (this.$refs.formItem) {
        return this.$refs.formItem.clearValidationEffect(...args)
      }
    }
  },
  render () {
    return h(NCol, {
      ...this.$props
    }, {
      default: () => {
        return h(NFormItem, {
          ref: 'formItem',
          ...this.$props
        }, {
          default: this.$slots.default
        })
      }
    })
  }
}
</script>
