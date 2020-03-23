import withapp from './withapp'

function cleanUp (content, target) {
  if (content && target && target.contains(content)) {
    target.removeChild(content)
  }
}

/**
 * Detach $refs.contentContainer to detachTarget
 *
 * Dependency:
 * $refs.contentContainer
 *
 * @prop {() => HTMLElement} detachTarget determine where should $refs.contentContainer to be detached
 */
export default {
  mixins: [ withapp ],
  inject: {
    NModal: {
      default: null
    },
    NDrawer: {
      default: null
    }
  },
  props: {
    detachTarget: {
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
    getDetachTarget () {
      return this.detachTarget()
    },
    getDetachContent () {
      return this.$refs.contentContainer
    },
    detachContent () {
      const content = this.getDetachContent()
      if (content) {
        content.parentNode.removeChild(content)
      } else {
        console.error('[naive-ui/detachable]: fail to detach content')
      }
    },
    appendContent () {
      this.getDetachTarget().append(this.$refs.contentContainer)
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
      const content = this.getDetachContent()
      const target = this.getDetachTarget()
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
    }
  }
}
