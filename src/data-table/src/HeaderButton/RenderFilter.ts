import { defineComponent, PropType } from 'vue'
import { FilterRender } from '../interface'

export default defineComponent({
  name: 'DataTableFilterRender',
  props: {
    render: {
      type: Function as PropType<FilterRender>,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  render () {
    const { render, active, show } = this
    return render({
      active,
      show
    })
  }
})
