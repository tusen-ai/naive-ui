<script>
import NFormItem from './FormItem'
import NCol from '../../Grid/src/Col'

export default {
  name: 'NFormItemCol',
  functional: true,
  render (h, context) {
    return h(NCol, {
      props: context.props,
      scopedSlots: {
        default: () => {
          return h(NFormItem, {
            props: context.props,
            scopedSlots: context.scopedSlots
          })
        }
      }
    })
  }
}
</script>
