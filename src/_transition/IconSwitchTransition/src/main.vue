<script>
import getDefaultSlot from '../../../_utils/vue/getDefaultSlot'

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
        name: 'n-icon-switch-transition',
        appear: this.appear
      }
    }, getDefaultSlot(this))
  }
}
</script>
