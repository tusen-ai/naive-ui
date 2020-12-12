export default {
  name: 'DataTableSorterRender',
  props: {
    render: {
      type: Function,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    },
    order: {
      // asc, desc
      type: [String, Boolean],
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    }
  },
  render () {
    const { render, active, order } = this
    return render({
      active,
      order
    })
  }
}
