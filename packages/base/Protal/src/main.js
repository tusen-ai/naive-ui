export default {
  name: 'NBasePortal',
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    document.body.removeChild(this.$el)
  },
  render () {
    const defaultSlot = this.$slots.default
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(`NBaseProtal: default slot has more than one child`)
      }
      return defaultSlot[0]
    } else {
      console.error(`NBaseProtal: default slot is empty`)
      return null
    }
  }
}
