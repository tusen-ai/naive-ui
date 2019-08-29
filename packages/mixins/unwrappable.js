export default {
  data () {
    return {
      activatorEls: []
    }
  },
  mounted () {
    const el = this.$el
    const parentEl = el.parentElement
    const childrenEl = el.children
    let i = childrenEl.length - 1
    while (i >= 0) {
      const elInNewPosition = parentEl.insertBefore(childrenEl[i], el)
      this.activatorEls.push(elInNewPosition)
      --i
    }
    parentEl.removeChild(el)
  },
  beforeDestroy () {
    for (const el of this.activatorEls) {
      const parentEl = el.parentElement
      parentEl.removeChild(el)
    }
    this.activatorEls = null
  }
}
