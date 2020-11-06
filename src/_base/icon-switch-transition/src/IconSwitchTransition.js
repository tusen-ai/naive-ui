import { h, nextTick, Transition } from 'vue'

export default {
  name: 'NBaseIconSwitchTransition',
  data () {
    return {
      appear: false
    }
  },
  mounted () {
    nextTick(() => {
      this.appear = true
    })
  },
  render () {
    return h(Transition, {
      name: 'n-icon-switch-transition',
      appear: this.appear
    }, this.$slots)
  }
}
