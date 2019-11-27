<script>
import NFormItemCol from './FormItemCol'
import NRow from '../../Grid/src/main'
import NFormItem from './FormItem'

export default {
  name: 'NFormItemRow',
  props: {
    ...NRow.props,
    ...NFormItem.props
  },
  methods: {
    validate (...args) {
      if (this.$refs.formItemCol) {
        return this.$refs.formItemCol.validate(...args)
      }
    }
  },
  render (h) {
    return h(NRow, {
      props: { ...this.$props },
      scopedSlots: {
        default: () => h(NFormItemCol, {
          ref: 'formItemCol',
          props: {
            span: 24,
            ...this.$props
          },
          scopedSlots: this.$scopedSlots
        })
      }
    })
  }
}
</script>
