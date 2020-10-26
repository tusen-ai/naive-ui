<script>
import { h } from 'vue'
import NCol from '../../src/grid/src/Col.vue'
import NRow from '../../src/grid/src/Row.vue'

export default {
  name: 'ComponentDemos',
  props: {
    singleColumn: {
      type: Boolean,
      default: false
    }
  },
  render () {
    const defaultSlot = (this.$slots.default && this.$slots.default()) || []
    // const anchorSlot = (this.$slots.anchor && this.$slots.anchor()) || []
    // const anchor = [h('div', {
    //   staticClass: 'n-documentation-anchor'
    // }, anchorSlot)]
    if (this.singleColumn) {
      return h(NRow, {
        gutter: 16
      }, {
        default: () => h(NCol, { span: 24 }, this.$slots)
        // h(NCol, { props: { span: 4 } }, anchorSlot)
      })
    } else {
      const leftColumn = defaultSlot.filter((value, index) => index % 2 === 0)
      const rightColumn = defaultSlot.filter((value, index) => index % 2 === 1)
      return h(NRow, {
        gutter: 16
      }, {
        default: () => [
          h(NCol, { span: 12 }, {
            default: () => leftColumn
          }),
          h(NCol, { span: 12 }, {
            default: () => rightColumn
          })
        // h(NCol, { props: { span: 4 } }, anchor)
        ]
      })
    }
  }
}
</script>
