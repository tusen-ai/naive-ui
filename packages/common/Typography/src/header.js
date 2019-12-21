import getTheme from './getTheme'

export default level =>({
  name: 'NH' + level,
  functional: true,
  props: {
    type: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    },
    alignText: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    const props = context.props
    const on = context.listeners
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h(`h${level}`, {
      staticClass: `n-h${level}`,
      class: {
        [`n-${theme}-theme`]: theme,
        [`n-h${level}--${props.type}-type`]: props.type,
        [`n-h${level}--prefix-bar`]: props.prefix,
        [`n-h${level}--align-text`]: props.alignText
      },
      attrs: context.data.attrs,
      on
    }, defaultSlot)
  }
})