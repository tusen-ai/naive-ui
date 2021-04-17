import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Th',
  render () {
    return <th>{this.$slots}</th>
  }
})
