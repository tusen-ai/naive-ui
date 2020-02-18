<script>
import getTheme from './getTheme'

export default {
  name: 'NP',
  functional: true,
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    tertiary: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const on = context.listeners
    const theme = getTheme(context.parent)
    const props = context.props
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    const isPrimary = props.primary
    const isSecondary = props.secondary
    const isTertiary = props.tertiary
    return h('p', {
      staticClass: 'n-p',
      class: {
        [`n-${theme}-theme`]: theme,
        'n-p--primary': isPrimary,
        'n-p--secondary': isSecondary,
        'n-p--tertiary': isTertiary
      },
      ...context.data,
      on
    }, defaultSlot)
  }
}
</script>
