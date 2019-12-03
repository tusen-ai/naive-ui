<script>
import NScrollbar from './Scrollbar.vue'

export default {
  name: 'NScrollbar',
  functional: true,
  render (h, context) {
    if (context.props.withoutScrollbar) return context.scopedSlots.default()
    else {
      return h(NScrollbar, {
        props: context.props,
        scopedSlots: context.scopedSlots,
        on: context.listeners
      })
    }
  }
}
</script>
