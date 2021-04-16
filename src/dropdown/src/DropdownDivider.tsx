import { h, defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownDivider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  render () {
    return <div class={`${this.clsPrefix}-dropdown-divider`} />
  }
})
