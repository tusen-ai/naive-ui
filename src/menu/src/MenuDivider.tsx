import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuDivider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  render () {
    return <div class={`${this.clsPrefix}-menu-item-divider`} />
  }
})
