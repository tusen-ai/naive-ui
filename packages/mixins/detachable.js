import withapp from './withapp'

/**
 * Detach $refs.contentContainer to detachTarget
 *
 * Dependency:
 * $refs.contentContainer
 *
 * @prop {HTMLElement} detachTarget determine where should $refs.contentContainer to be detached
 */
export default {
  mixins: [withapp],
  props: {
    detachTarget: {
      validator () {
        return true
      },
      default: () => document.body
    },
    cleanManually: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    detachContent () {
      this.$refs.contentContainer.parentNode.removeChild(this.$refs.contentContainer)
      this.detachTarget.append(this.$refs.contentContainer)
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
    if (!this.cleanManually) {
      this.detachTarget.removeChild(this.$refs.contentContainer)
    }
  }
}
