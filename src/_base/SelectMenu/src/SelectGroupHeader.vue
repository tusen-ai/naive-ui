<script>
export default {
  name: 'NBaseSelectGroupHeader',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render (h) {
    const children = (this.data.render && this.data.render(h, this.data)) || [ this.data.name ]
    return h('div', {
      staticClass: 'n-base-select-group-header'
    }, Array.isArray(children) ? children : [ children ])
  }
}
</script>
