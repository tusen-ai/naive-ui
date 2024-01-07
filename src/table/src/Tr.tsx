import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tr',
  render () {
    return <tr>{this.$slots}</tr>
  }
})
