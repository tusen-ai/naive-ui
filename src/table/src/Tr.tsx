import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Tr',
  render () {
    return <tr class="n-table__tr">{this.$slots}</tr>
  }
})
