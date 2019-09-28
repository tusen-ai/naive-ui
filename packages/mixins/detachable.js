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
    }
  },
  watch: {
    active (value) {
      if (value && !this.contentContainerMounted) {
        this.contentContainerMounted = true
        this.appendContent()
      }
    }
  },
  data () {
    return {
      contentContainer: null,
      contentContainerMounted: false
    }
  },
  methods: {
    detachContent () {
      this.contentContainer = this.$refs.contentContainer
      this.$refs.contentContainer.parentNode.removeChild(this.$refs.contentContainer)
    },
    appendContent () {
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
    if (this.value && !this.contentContainerMounted) {
      this.contentContainerMounted = true
      this.appendContent()
    }
    // this.appendContent()
  },
  beforeDestroy () {
    if (this.detachTarget.contains(this.$refs.contentContainer)) {
      this.detachTarget.removeChild(this.$refs.contentContainer)
    }
  }
}
