export default {
  name: 'NBasePortal',
  inject: {
    NModal: {
      default: null
    }
  },
  props: {
    onMounted: {
      type: Function,
      default: null
    },
    target: {
      type: Function,
      default: () => document.body
    }
  },
  mounted () {
    if (this.onMounted) this.onMounted()
    if (!this.transferable) return
    if (this.$el.parentElement && !this.elementTransferred) {
      this.$el.parentElement.removeChild(this.$el)
    }
  },
  beforeDestroy () {
    if (!this.transferable) return
    const target = this.target()
    if (target.contains(this.$el)) {
      target.removeChild(this.$el)
    }
  },
  data () {
    return {
      elementTransferred: false
    }
  },
  computed: {
    transferable () {
      return !this.NModal
    }
  },
  methods: {
    transferElement () {
      if (!this.transferable) return
      if (!this.elementTransferred) {
        this.target().appendChild(this.$el)
        this.elementTransferred = true
      }
    }
  },
  render () {
    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default() : []
    const childrenCount = defaultSlot && defaultSlot.length
    if (defaultSlot && childrenCount) {
      if (childrenCount !== 1) {
        console.error(
          '[naive-ui/n-base-portal]: `n-base-portal` only takes single child node. If multiple child nodes are set, only the first one will be rendered.'
        )
      }
      return defaultSlot[0]
    } else {
      console.error(
        '[naive-ui/n-base-portal]: `n-base-portal` has no child node.'
      )
      return null
    }
  }
}
