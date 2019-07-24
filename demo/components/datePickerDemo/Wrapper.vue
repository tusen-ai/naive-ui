
<script>
export default {
  render () {
    console.log(this.$slots.default[0].componentOptions.propsData.content = '999')
    console.log(this.$slots.default[0].componentOptions)
    return ('div', {}, [...this.$slots.default])
  }
}
</script>
