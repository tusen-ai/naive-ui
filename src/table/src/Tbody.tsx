import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Tbody',
  render () {
    return <tbody class="n-table__tbody">{this.$slots}</tbody>
  }
})
