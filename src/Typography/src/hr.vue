<script>
import getTheme from './getTheme'

export default {
  name: 'NHr',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('hr', {
      staticClass: 'n-hr',
      class: {
        [`n-${theme}-theme`]: theme
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
