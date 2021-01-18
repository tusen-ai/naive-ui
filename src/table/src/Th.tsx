import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Th',
  render () {
    return <tr class="n-table__th">{renderSlot(this.$slots, 'default')}</tr>
  }
})
