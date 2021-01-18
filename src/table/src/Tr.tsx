import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Tr',
  render () {
    return <tr class="n-table__tr">{renderSlot(this.$slots, 'default')}</tr>
  }
})
