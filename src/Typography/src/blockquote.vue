<script>
import getTheme from './getTheme'

export default {
  name: 'NBlockquote',
  functional: true,
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const on = context.listeners
    const attrs = context.data.attrs
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('blockquote', {
      staticClass: 'n-blockquote',
      class: {
        [`n-${theme}-theme`]: theme,
        'n-blockquote--align-text': context.props.alignText
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
