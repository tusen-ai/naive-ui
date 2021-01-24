import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Th',
  render () {
    return <th class="n-table__th">{this.$slots}</th>
  }
})
