import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Td',
  render () {
    return <td>{this.$slots}</td>
  }
})
