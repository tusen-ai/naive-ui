import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Td',
  render () {
    return <tr class="n-table__td">{renderSlot(this.$slots, 'default')}</tr>
  }
})
