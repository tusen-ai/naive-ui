<script>
export default {
  watch: {
    '$i18n.locale': function () {
      console.log('locale change')
    }
  },
  render (h, context) {
    const locale = this.$i18n.locale
    const defaultSlot = this.$slots.default || []
    const index = defaultSlot.findIndex(VNode => VNode.componentOptions.tag === locale)
    console.log(locale, defaultSlot[0].componentOptions.tag)
    console.log(index)
    if (~index) {
      return defaultSlot[index]
    } else return defaultSlot[0] || null
  }
}
</script>
