export default {
  name: 'NBaseContext',
  render () {
    const defaultSlot = this.$slots.default
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(
          '[naive-ui/base-context]: `n-base-context` only takes single child node. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
      return defaultSlot[0]
    } else {
      return null
    }
  }
}
