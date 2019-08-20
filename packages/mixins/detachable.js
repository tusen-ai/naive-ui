/**
 * Detach $refs.contentContainer to detachTarget
 *
 * Dependency:
 * $refs.contentContainer
 *
 * @prop {HTMLElement} detachTarget determine where should $refs.contentContainer to be detached
 */
export default {
  inject: [ 'NApp' ],
  computed: {
    namespace () {
      return (this.NApp && this.NApp.namespace) || null
    }
  },
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
  watch: {
    'NApp.namespace': function (newNamespace, oldNamespace) {
      this.removeNamespace(oldNamespace)
      this.setNamespace(newNamespace)
    }
  },
  methods: {
    detachContent () {
      this.$refs.contentContainer.parentNode.removeChild(this.$refs.contentContainer)
      this.detachTarget.append(this.$refs.contentContainer)
    },
    removeNamespace (namespace) {
      if (!namespace) return
      const contentContainer = this.$refs.contentContainer
      if (contentContainer) {
        contentContainer.classList.remove(namespace)
      }
    },
    setNamespace (namespace) {
      if (!namespace) return
      const contentContainer = this.$refs.contentContainer
      if (contentContainer) {
        contentContainer.classList.add(namespace)
      }
    }
  },
  beforeMount () {
    if (!this.detachTarget) {
      console.warn(this.$options.name, ' will be mounted to', this.detachTarget, ', but it doesn\'t exist! Modal component won\'t work!')
    }
  },
  /**
   * There might be some potential problem, it may exists some moment that namespace is removed
   */
  mounted () {
    this.detachTarget = document.body // getScrollParent(this.$refs.self)
    if (this.namespace) {
      this.setNamespace(this.namespace)
    }
    this.detachContent()
  },
  updated () {
    if (this.namespace) {
      this.$nextTick().then(() => {
        this.setNamespace(this.namespace)
      })
    }
  },
  beforeDestroy () {
    if (!this.cleanManually) {
      this.detachTarget.removeChild(this.$refs.contentContainer)
    }
  }
}
