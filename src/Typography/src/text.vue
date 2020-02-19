<script>
import getTheme from './getTheme'

export default {
  name: 'NText',
  functional: true,
  props: {
    code: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    delete: {
      type: Boolean,
      default: false
    },
    strong: {
      type: Boolean,
      default: false
    },
    italic: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    depth: {
      validator (value) {
        return ['primary', 'secondary', 'tertiary'].includes(value)
      },
      default: 'secondary'
    }
  },
  render (h, context) {
    const props = context.props
    const type = props.type
    const isCode = props.code
    const isDelete = props.delete
    const isStrong = props.strong
    const isItalic = props.italic
    const isDisabled = props.disabled
    const isUnderline = props.underline
    const depth = props.depth
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h(isCode ? 'code' : isDelete ? 'del' : 'span', {
      staticClass: 'n-text',
      class: {
        [`n-${theme}-theme`]: theme,
        'n-text--code': isCode,
        [`n-text--${type}-type`]: type,
        'n-text--delete': isDelete,
        'n-text--strong': isStrong,
        'n-text--italic': isItalic,
        'n-text--disabled': isDisabled,
        'n-text--underline': isUnderline,
        [`n-text--${depth}-depth`]: depth
      },
      ...context.data,
      on
    }, isDelete && isCode ? [
      h('del', {}, defaultSlot)
    ] : defaultSlot)
  }
}
</script>
