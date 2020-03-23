function cleanUp (content, target) {
  if (content && target && target.contains(content)) {
    target.removeChild(content)
  }
}

export default {
  name: 'NBasePortal',
  inject: {
    NModal: {
      default: null
    },
    NDrawer: {
      default: null
    }
  },
  props: {
    onMounted: {
      type: Function,
      default: null
    },
    transferTarget: {
      type: Function,
      default: function () {
        const NModal = this.NModal
        if (NModal) {
          return NModal.getDetachTarget()
        }
        const NDrawer = this.NDrawer
        if (NDrawer) {
          return NDrawer.getDetachTarget()
        }
        return document.body
      }
    }
  },
  mounted () {
    if (this.onMounted) this.onMounted()
    if (this.$el.parentElement && !this.elementTransferred) {
      this.$el.parentElement.removeChild(this.$el)
    }
  },
  beforeDestroy () {
    const target = this.transferTarget()
    const content = this.$el
    /**
     * Since content may be detached in modal, waiting animation done is
     * important. A more elegant solution is needed.
     */
    if (this.NModal || this.NDrawer) {
      setTimeout(() => {
        cleanUp(content, target)
      }, 300)
    } else {
      cleanUp(content, target)
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
        this.transferTarget().appendChild(this.$el)
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
