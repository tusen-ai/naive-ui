import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Thead',
  render () {
    return <thead>{this.$slots}</thead>
  }
})
