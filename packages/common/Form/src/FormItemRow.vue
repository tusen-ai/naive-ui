<script>
import NFormItemCol from './FormItemCol'
import NRow from '../../Grid/src/main'

export default {
  name: 'NFormItemRow',
  functional: true,
  render (h, context) {
    return h(NRow, {
      props: context.props,
      scopedSlots: {
        default: () => h(NFormItemCol, {
          props: {
            span: 24,
            ...context.props
          },
          scopedSlots: context.scopedSlots
        })
      }
    })
  }
}
</script>
