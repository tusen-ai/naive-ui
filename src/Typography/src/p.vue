<script>
import getTheme from './getTheme'

export default {
  name: 'NP',
  functional: true,
  props: {
    depth: {
      validator (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      },
      default: null
    }
  },
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const props = context.props
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    const depth = props.depth
    return h('p', {
      staticClass: 'n-p',
      class: {
        [`n-${theme}-theme`]: theme,
        [`n-p--${depth}-depth`]: depth
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
