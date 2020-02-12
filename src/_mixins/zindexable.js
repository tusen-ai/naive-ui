
import zIndexManager from '../_utils/dom/zIndexManager'

/**
 * watch active on component,
 * acquire new z-index on content when active is set to true
 *
 * dependency:
 * $refs.contentContainer
 * $vm.active
 * $vm.detached
 */
export default {
  mounted () {
    if (!this.detached) return
    if (this.active) this._initZindexable()
  },
  watch: {
    active (value) {
      if (!this.detached) return
      console.debug('[zindexable.watch.active]:', value)
      if (value) {
        this._initZindexable()
        zIndexManager.setNewZIndex(this._getZindexableContent())
      }
    }
  },
  data () {
    return {
      zindexableInitialized: false
    }
  },
  beforeDestroy () {
    if (!this.detached) return
    if (this.zindexableInitialized) {
      zIndexManager.unregisterElement(this._getZindexableContent())
    }
  },
  methods: {
    _initZindexable () {
      if (!this.zindexableInitialized) {
        zIndexManager.registerElement(this._getZindexableContent())
        this.zindexableInitialized = true
      }
    },
    _getZindexableContent () {
      if (this.$refs.contentContainer) {
        return this.$refs.contentContainer
      } else {
        return this.getZindexableContent()
      }
    }
  }
}
