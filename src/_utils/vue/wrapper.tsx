import { defineComponent } from 'vue'

export const Wrapper = defineComponent({
  render () {
    return this.$slots.default?.()
  }
})
