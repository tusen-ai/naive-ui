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

    const { keyName, render, row } = ctx.props
    if (render) {
      return h('div', [render(h, params)])
    } else return h('div', [params.row[keyName]])
  }
}
