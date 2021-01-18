import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Thead',
  render () {
    return <tr class="n-table__thead">{renderSlot(this.$slots, 'default')}</tr>
  }
})
