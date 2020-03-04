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
  mixins: [ withapp ],
  inject: {
    NModal: {
      default: null
    }
  },
  props: {
    detachTarget: {
      validator () {
        return true
      },
      default: () => document.body
    },
    detachable: {
      type: Boolean,
      default: null
    }
  },
  watch: {
    active (value) {
      if (this.syntheticDetachable) {
        if (value && !this.contentContainerMounted) {
          this.contentContainerMounted = true
          this.appendContent()
        }
      }
    }
  },
  computed: {
    syntheticDetachable () {
      const detachable = this.detachable
      if (detachable !== null) return detachable
      if (this.NModal) return false
      return true
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
      console.error(
        '[naive-ui/mixins/detachable]: %s has no `detach-target`.',
        this.$options.name
      )
    }
  },
  mounted () {
    if (this.syntheticDetachable) {
      this.detachContent()
      if (this.active && !this.contentContainerMounted) {
        this.contentContainerMounted = true
        this.appendContent()
      }
    }
  },
  beforeDestroy () {
    if (this.syntheticDetachable) {
      if (this.detachTarget.contains(this.$refs.contentContainer)) {
        this.detachTarget.removeChild(this.$refs.contentContainer)
      }
    }
  }
}
