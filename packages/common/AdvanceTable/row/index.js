export default {
  name: 'Row',
  functional: true,
  props: {
    render: Function,
    row: Object,
    index: Number,
    keyName: String
  },
  render: (h, ctx) => {
    const params = ctx.props.row

    const { keyName, render, index } = ctx.props
    if (render) {
      return render(h, params, index)
    } else return h('div', [params.row[keyName]])
  }
}
