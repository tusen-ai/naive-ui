export default {
  functional: true,
  props: {
    render: {
      type: [String, Function],
      default: () => {}
    }
  },
  render (h, context) {
    const render = context.props.render
    if (typeof render === 'function') {
      return render(h)
    } else if (typeof render === 'string') {
      return context._v(render)
    } else {
      return null
    }
  }
}
