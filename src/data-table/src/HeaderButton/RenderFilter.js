export default {
  name: 'DataTableFilterRender',
  props: {
    render: {
      type: Function,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: undefined
    }
  },
  render () {
    const {
      render,
      active,
      show
    } = this
    return render({
      active,
      show
    })
  }
}
