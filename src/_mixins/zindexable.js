
import zIndexManager from '../_utils/dom/zIndexManager'

/**
 * watch active on component,
 * acquire new z-index on content when active is set to true
 *
 * dependency:
 * $refs.contentContainer
 * $vm.active
 * $vm.syntheticDetachable
 */
export default {
  props: {
    zIndex: {
      type: Number,
      default: undefined
    }
  },
  mounted () {
    if (!this.syntheticDetachable && !this.zindexable) return
    if (this.active) this._initZindexable()
  },
  watch: {
    active (value) {
      if (!this.syntheticDetachable && !this.zindexable) return
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[zindexable.watch.active]:', value)
      }
      if (value) {
        this._initZindexable()
        zIndexManager.setNewZIndex(this._getZindexableContent(), this.zIndex)
      }
    }
  },
  data () {
    return {
      zindexableInitialized: false
    }
  },
  beforeDestroy () {
    if (!this.syntheticDetachable && !this.zindexable) return
    if (this.zindexableInitialized) {
      zIndexManager.unregisterElement(this._getZindexableContent())
    }
  },
  methods: {
    _initZindexable () {
      if (!this.zindexableInitialized) {
        zIndexManager.registerElement(this._getZindexableContent(), this.zIndex)
        this.zindexableInitialized = true
      }
    },
    _getZindexableContent () {
      const refs = this.$refs
      if (refs.contentContainer) {
        return refs.contentContainer
      } else {
        return this.getZindexableContent()
      }
    }
  }
}
