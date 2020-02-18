<script>
import getTheme from './getTheme'

export default {
  name: 'NOl',
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
    return h('ol', {
      staticClass: 'n-ol',
      class: {
        [`n-${theme}-theme`]: theme,
        [`n-ol--align-text`]: context.props.alignText
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
