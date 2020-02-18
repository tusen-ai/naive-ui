<script>
import getTheme from './getTheme'

export default {
  name: 'NUl',
  functional: true,
  props: {
    alignText: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h('ul', {
      staticClass: 'n-ul',
      class: {
        [`n-${theme}-theme`]: theme,
        [`n-ul--align-text`]: context.props.alignText
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
