<script>
import getTheme from './getTheme'

export default {
  name: 'NH5',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const attrs = context.props
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('h5', {
      staticClass: 'n-h5',
      class: {
        [`n-${theme}-theme`]: theme
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
