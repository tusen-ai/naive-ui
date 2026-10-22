import type { PropType } from 'vue'
import type { RenderFilter } from '../interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DataTableRenderFilter',
  props: {
    render: {
      type: Function as PropType<RenderFilter>,
      required: true
    },
    active: Boolean,
    show: Boolean
  },
  render() {
    const { render, active, show } = this
    return render({
      active,
      show
    })
  }
})
