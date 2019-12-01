<script>
export default {
  name: 'NSelectRenderOptions',
  functional: true,
  render (h, context) {
    const defaultSlot = context.scopedSlots.default()
    const filteredDefaultSlot = defaultSlot
      .filter(vNode => {
        const value = vNode.componentOptions.propsData.label || (vNode.componentOptions.children || []).map(c => c.text).join('').trim() || vNode.componentOptions.propsData.value
        const filter = context.props.filter
        if (filter) {
          return filter(value)
        } return true
      })
    return filteredDefaultSlot
  }
}
</script>
