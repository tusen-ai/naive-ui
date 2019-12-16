export default {
  name: 'NBaseContext',
  render () {
    const defaultSlot = this.$slots.default
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(`NBaseContext: default slot has more than one child`)
      }
      return defaultSlot[0]
    } else {
      return null
    }
  }
}
