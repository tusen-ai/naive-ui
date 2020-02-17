<script>
import getTheme from './getTheme'

export default {
  name: 'NP',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('p', {
      staticClass: 'n-p',
      class: {
        [`n-${theme}-theme`]: theme
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
