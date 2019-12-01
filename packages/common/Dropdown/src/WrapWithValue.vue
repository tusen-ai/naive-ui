<script>
export default {
  functional: true,
  render (h, context) {
    const defaultSlot = context.scopedSlots.default()
    return defaultSlot.map((vNode, index) => {
      vNode.componentOptions.propsData.value = index + 1
      vNode.key = index + 1
      return vNode
    })
  }
}
</script>
