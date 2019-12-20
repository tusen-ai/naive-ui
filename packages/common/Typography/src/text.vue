<script>
import getTheme from './getTheme'

export default {
  name: 'NText',
  functional: true,
  render (h, context) {
    const isCode = context.props.code !== undefined
    const on = context.listeners
    const attrs = context.props
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h(isCode ? 'code' : 'span', {
      staticClass: 'n-text',
      class: {
        [`n-${theme}-theme`]: theme,
        'n-text--code': isCode
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
