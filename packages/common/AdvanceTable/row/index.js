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
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    }

    const { keyName, render, row } = ctx.props
    if (render) {
      return h('div', [render(h, params)])
    } else return h('div', [row[keyName]])
  }
}
