<script>
import getTheme from './getTheme'

export default {
  name: 'NLi',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('li', {
      staticClass: 'n-li',
      class: {
        [`n-${theme}-theme`]: theme
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
