import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Thead',
  render () {
    return (
      <thead class="n-table__thead">{renderSlot(this.$slots, 'default')}</thead>
    )
  }
})
