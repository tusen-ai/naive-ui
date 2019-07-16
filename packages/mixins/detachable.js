/**
 * detach $refs.contentWrapper to detachTarget
 */
export default {
  props: {
    detachTarget: {
      validator () {
        return true
      },
      default: () => document.body
    }
  },
  methods: {
    detachContent () {
      this.$refs.contentWrapper.parentNode.removeChild(this.$refs.contentWrapper)
      this.detachTarget.append(this.$refs.contentWrapper)
    }
  },
  beforeMount () {
    if (!this.detachTarget) {
      console.warn(this.$options.name, ' will be mounted to', this.detachTarget, ', but it doesn\'t exist! Modal component won\'t work!')
    }
  },
  mounted () {
    this.detachTarget = document.body // getScrollParent(this.$refs.self)
    this.detachContent()
  },
  beforeDestroy () {
    this.detachTarget.removeChild(this.$refs.contentWrapper)
  }
}
