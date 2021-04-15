import { defineComponent, createTextVNode, PropType } from 'vue'

export const render = defineComponent({
  name: 'Render',
  props: {
    render: [String, Number, Function, Boolean] as PropType<unknown>
  },
  render () {
    const { render } = this
    if (render === undefined || render === null) return null
    if (typeof render === 'function') {
      return render()
    } else if (typeof render === 'string') {
      return createTextVNode(render)
    } else if (typeof render === 'number') {
      return createTextVNode(String(render))
    } else {
      return JSON.stringify(render)
    }
  }
})
