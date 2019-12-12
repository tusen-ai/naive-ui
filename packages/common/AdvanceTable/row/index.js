export default {
  name: 'Row',
  functional: true,
  props: {
    render: Function,
    row: Object,
    index: Number,
    keyName: [String, Number],
    column: Object,
    title: String
  },
  render: (h, ctx) => {
    const params = ctx.props.row || {}

    const { keyName, render, index, column, title } = ctx.props
    if (render) {
      return render(h, params, index)
    } else {
      if (title) {
        params.row = {}
        params.row[keyName] = title
      }

      return h(
        'div',
        {
          class: {
            'n-advance-table__td-text': true,
            'n-advance-table__td-text--ellipsis': column.ellipsis
          },
          domProps: {
            title: column.ellipsis ? params.row[keyName] : ''
          }
        },
        [params.row[keyName]]
      )
    }
  }
}
