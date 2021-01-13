import { defineComponent, createTextVNode, PropType, } from 'vue'

export const render = defineComponent({
  name: 'Render',
  props: {
    render: {
      type: [String, Number, Function] as PropType<string | number | null | undefined | Function>,
      default: undefined
    }
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
