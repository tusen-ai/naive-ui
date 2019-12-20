<script>
import getTheme from './getTheme'

export default {
  name: 'NH1',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const attrs = context.props
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('h1', {
      staticClass: 'n-h1',
      class: {
        [`n-${theme}-theme`]: theme
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
