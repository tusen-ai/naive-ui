import { defineComponent, PropType } from 'vue'
import { RenderFilter } from '../interface'

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
  render () {
    const { render, active, show } = this
    return render({
      active,
      show
    })
  }
})
