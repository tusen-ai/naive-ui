<script>
import getTheme from './getTheme'

export default {
  name: 'NH4',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const attrs = context.props
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('h4', {
      staticClass: 'n-h4',
      class: {
        [`n-${theme}-theme`]: theme
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
