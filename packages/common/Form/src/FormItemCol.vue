<script>
import NFormItem from './FormItem'
import NCol from '../../Grid/src/Col'

export default {
  name: 'NFormItemCol',
  props: {
    ...NCol.props,
    ...NFormItem.props
  },
  methods: {
    validate (...args) {
      if (this.$refs.formItem) {
        return this.$refs.formItem.validate(...args)
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
            scopedSlots: this.$scopedSlots
          })
        }
      }
    })
  }
}
</script>
