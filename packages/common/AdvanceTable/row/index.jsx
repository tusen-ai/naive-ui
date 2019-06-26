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
      return <div>{render(h, params)}</div>
    } else return <div>{row[keyName]}</div>
  }
}
