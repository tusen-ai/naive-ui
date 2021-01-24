import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Td',
  render () {
    return <td class="n-table__td">{this.$slots}</td>
  }
})
