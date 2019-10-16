<script>
export default {
  name: 'ComponentDemos',
  props: {
    singleColumn: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    const defaultSlot = (this.$scopedSlots.default && this.$scopedSlots.default()) || []
    // const anchorSlot = (this.$scopedSlots.anchor && this.$scopedSlots.anchor()) || []
    // const anchor = [h('div', {
    //   staticClass: 'n-documentation-anchor'
    // }, anchorSlot)]
    if (this.singleColumn) {
      return h('n-row', {
        props: {
          gutter: 16
        }
      }, [
        h('n-col', { props: { span: 24 } }, defaultSlot)
        // h('n-col', { props: { span: 4 } }, anchorSlot)
      ])
    } else {
      const leftColumn = defaultSlot.filter((value, index) => index % 2 === 0)
      const rightColumn = defaultSlot.filter((value, index) => index % 2 === 1)
      return h('n-row', {
        props: {
          gutter: 16
        }
      }, [
        h('n-col', { props: { span: 12 } }, leftColumn),
        h('n-col', { props: { span: 12 } }, rightColumn)
        // h('n-col', { props: { span: 4 } }, anchor)
      ])
    }
  }
}
</script>
