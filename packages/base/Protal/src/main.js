export default {
  name: 'NBasePortal',
  mounted () {
    if (this.$el.parentElement) {
      this.$el.parentElement.removeChild(this.$el)
    }
    // this.transferElement()
  },
  beforeDestroy () {
    if (document.body.contains(this.$el)) {
      document.body.removeChild(this.$el)
    }
  },
  data () {
    return {
      elementTransferred: false
    }
  },
  methods: {
    transferElement () {
      if (!this.elementTransferred) {
        document.body.appendChild(this.$el)
      }
    }
  },
  render () {
    const defaultSlot = this.$slots.default
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(`NBaseProtal: default slot has more than one child`)
      }
      return defaultSlot[0]
    } else {
      console.error(`NBaseProtal: default slot is empty`)
      return null
    }
  }
}
