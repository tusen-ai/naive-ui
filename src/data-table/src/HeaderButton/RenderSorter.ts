import { defineComponent, PropType } from 'vue'
import { SorterRender, SortOrder } from '../interface'

export default defineComponent({
  name: 'DataTableSorterRender',
  props: {
    render: {
      type: Function as PropType<SorterRender>,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    order: {
      // asc, desc
      type: [String, Boolean] as PropType<SortOrder>,
      default: false
    }
  },
  render () {
    const { render, active, order } = this
    return render({
      active,
      order
    })
  }
})
