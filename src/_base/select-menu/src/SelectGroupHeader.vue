<script>
import { h } from 'vue'

export default {
  name: 'NBaseSelectGroupHeader',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  render () {
    const data = this.data
    const children = data.render ? [data.render(h, data)] : [ data.name ]
    return h('div', {
      class: 'n-base-select-group-header'
    }, children)
  }
}
</script>
