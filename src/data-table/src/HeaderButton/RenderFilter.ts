import type { RenderFilter } from '../interface'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'DataTableRenderFilter',
  props: {
    render: {
      type: Function as PropType<RenderFilter>,
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
  render() {
    const { render, active, show } = this
    return render({
      active,
      show
    })
  }
})
