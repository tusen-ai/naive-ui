import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Tbody',
  render () {
    return <tbody>{this.$slots}</tbody>
  }
})
