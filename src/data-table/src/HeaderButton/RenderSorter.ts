import type { RenderSorter, SortOrder } from '../interface'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'DataTableRenderSorter',
  props: {
    render: {
      type: Function as PropType<RenderSorter>,
      required: true
    },
    order: {
      // asc, desc
      type: [String, Boolean] as PropType<SortOrder>,
      default: false
    }
  },
  render() {
    const { render, order } = this
    return render({
      order
    })
  }
})
