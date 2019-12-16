<script>
export default {
  name: 'NBaseIconTransition',
  data () {
    return {
      appear: false
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.appear = true
    })
  },
  render (h) {
    return h('transition', {
      props: {
        name: 'n-icon-switch',
        appear: this.appear
      }
    }, this.$slots.default)
  }
}
</script>
