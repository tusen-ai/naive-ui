export default {
  name: 'NBasePortal',
  props: {
    onMounted: {
      type: Function,
      default: null
    }
  },
  mounted () {
    if (this.onMounted) this.onMounted()
    if (this.$el.parentElement && !this.elementTransferred) {
      this.$el.parentElement.removeChild(this.$el)
    }
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
        this.elementTransferred = true
      }
    }
  },
  render () {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(`NBasePortal: default slot has more than one child`)
      }
      return defaultSlot[0]
    } else {
      console.error(`NBasePortal: default slot is empty`)
      return null
    }
  }
}
