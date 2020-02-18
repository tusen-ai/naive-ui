<script>
import getTheme from './getTheme'

export default {
  name: 'NA',
  functional: true,
  render (h, context) {
    const on = context.listeners
    const attrs = context.data.attrs || {}
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    const to = attrs.to
    if (to) delete attrs.to
    return to ? h('router-link', {
      staticClass: 'n-a',
      class: {
        [`n-${theme}-theme`]: theme
      },
      props: {
        to: to
      },
      ...context.data,
      on
    }, defaultSlot) : h('a', {
      staticClass: 'n-a',
      class: {
        [`n-${theme}-theme`]: theme
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
