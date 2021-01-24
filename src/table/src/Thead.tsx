import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Thead',
  render () {
    return <thead class="n-table__thead">{this.$slots}</thead>
  }
})
