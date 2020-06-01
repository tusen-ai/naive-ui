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
    const data = this.data
    const children = (data.render && data.render(h, data)) || [ data.name ]
    return h('div', {
      staticClass: 'n-base-select-group-header'
    }, Array.isArray(children) ? children : [ children ])
  }
}
</script>
