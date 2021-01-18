import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Tbody',
  render () {
    return <tr class="n-table__tbody">{renderSlot(this.$slots, 'default')}</tr>
  }
})
