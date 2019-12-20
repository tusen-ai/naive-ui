<script>
import getTheme from './getTheme'

export default {
  name: 'NText',
  functional: true,
  render (h, context) {
    const props = context.props
    const type = props.type
    const isCode = props.code !== undefined
    const isDelete = props.delete !== undefined
    const isStrong = props.strong !== undefined
    const isItalic = props.italic !== undefined
    const isDisabled = props.disabled !== undefined
    const isUnderline = props.underline !== undefined
    delete props.type
    delete props.code
    delete props.delete
    delete props.strong
    delete props.italic
    delete props.disabled
    delete props.underline
    console.log(props)
    const on = context.listeners
    const attrs = props
    const theme = getTheme(context.parent)
    const defaultSlot = context.slots.default || (context.scopedSlots.default && context.scopedSlots.default())
    return h(isCode ? 'code' : 'span', {
      staticClass: 'n-text',
      class: {
        [`n-${theme}-theme`]: theme,
        'n-text--code': isCode,
        [`n-text--${type}-type`]: type,
        'n-text--delete': isDelete,
        'n-text--strong': isStrong,
        'n-text--italic': isItalic,
        'n-text--disabled': isDisabled,
        'n-text--underline': isUnderline
      },
      attrs,
      on
    }, defaultSlot)
  }
}
</script>
