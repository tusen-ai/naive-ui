import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'Tbody',
  render () {
    return (
      <tbody class="n-table__tbody">{renderSlot(this.$slots, 'default')}</tbody>
    )
  }
})
