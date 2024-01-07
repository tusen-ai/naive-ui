import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Li',
  render () {
    return <li>{this.$slots}</li>
  }
})
