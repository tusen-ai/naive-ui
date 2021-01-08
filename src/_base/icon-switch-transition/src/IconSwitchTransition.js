import { h, nextTick, Transition, defineComponent } from 'vue'

export default defineComponent({
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
    return h(
      Transition,
      {
        name: 'n-icon-switch-transition',
        appear: this.appear
      },
      this.$slots
    )
  }
})
