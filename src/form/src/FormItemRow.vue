<script>
import { h } from 'vue'
import NFormItemCol from './FormItemCol'
import NRow from '../../grid/src/Row'
import NFormItem from './FormItem'

export default {
  name: 'FormItemRow',
  props: {
    ...NRow.props,
    ...NFormItem.props
  },
  methods: {
    validate (...args) {
      if (this.$refs.formItemCol) {
        return this.$refs.formItemCol.validate(...args)
      }
    },
    clearValidationEffect (...args) {
      if (this.$refs.formItem) {
        return this.$refs.formItem.clearValidationEffect(...args)
      }
    }
  },
  render () {
    return h(NRow, {
      ...this.$props
    }, {
      default: () => h(NFormItemCol, {
        ref: 'formItemCol',
        span: 24,
        ...this.$props
      }, {
        default: this.$slots.default
      })
    })
  }
}
</script>
