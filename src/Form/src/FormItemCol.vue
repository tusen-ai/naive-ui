<script>
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
  render (h) {
    return h(NCol, {
      props: { ...this.$props },
      scopedSlots: {
        default: () => {
          return h(NFormItem, {
            ref: 'formItem',
            props: { ...this.$props },
            scopedSlots: { ...this.$slots }
          })
        }
      }
    })
  }
}
</script>
