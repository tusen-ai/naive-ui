<script>
import { i18n } from '../util-compositions'

export default {
  setup () {
    return {
      ...(i18n())
    }
  },
  render () {
    const { locale } = this
    const defaultSlot = (this.$slots.default && this.$slots.default()) || []
    const index = defaultSlot.findIndex(VNode => VNode.type.name === locale)
    if (~index) {
      return defaultSlot[index]
    } else return defaultSlot[0] || null
  }
}
</script>
