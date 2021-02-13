import { defineComponent, PropType } from 'vue'
import { SorterRender, SortOrder } from '../interface'

export default defineComponent({
  name: 'DataTableSorterRender',
  props: {
    render: {
      type: Function as PropType<SorterRender>,
      required: true
    },
    order: {
      // asc, desc
      type: [String, Boolean] as PropType<SortOrder>,
      default: false
    }
  },
  render () {
    const { render, order } = this
    return render({
      order
    })
  }
})
