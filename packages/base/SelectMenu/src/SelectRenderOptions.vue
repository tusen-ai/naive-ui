<script>
export default {
  name: 'NSelectRenderOptions',
  functional: true,
  props: {
    options: {
      type: Array,
      default: null
    }
  },
  render (h, context) {
    const options = context.props.options
    return options.map((option, index) => option.render(index))
  }
}
</script>
