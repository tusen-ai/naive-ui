import { h, createTextVNode } from 'vue'

export default {
  props: {
    render: {
      type: [String, Number, Function],
      default: () => {}
    }
  },
  render () {
    const { render } = this
    if (typeof render === 'function') {
      return render(h)
    } else if (typeof render === 'string') {
      return createTextVNode(render)
    } else if (typeof render === 'number') {
      return createTextVNode(String(render))
    } else {
      return null
    }
  }
}
