import getDefaultSlot from '../../../_utils/vue/getDefaultSlot'

export default {
  name: 'NBaseContext',
  render () {
    const defaultSlot = getDefaultSlot(this)
    const childrenCount = defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount === 0) return null
      if (childrenCount !== 1) {
        console.error(
          '[naive-ui/base-context]: `n-base-context` only takes single child node. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
      return defaultSlot[0]
    }
  }
}
