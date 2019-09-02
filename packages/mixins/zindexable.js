
import zIndexManager from '../utils/dom/zIndexManager'

/**
 * watch active on component,
 * acquire new z-index on content when active is set to true
 *
 * dependency:
 * $refs.contentContainer
 * $vm.active
 */
export default {
  mounted () {
    zIndexManager.registerElement(this._getZindexableContent())
  },
  watch: {
    active (newActive) {
      console.debug('[zindexable.watch.active]:', newActive)
      if (newActive) {
        zIndexManager.setNewZIndex(this._getZindexableContent())
      }
    }
  },
  beforeDestroy () {
    zIndexManager.unregisterElement(this._getZindexableContent())
  },
  methods: {
    _getZindexableContent () {
      if (this.$refs.contentContainer) {
        return this.$refs.contentContainer
      } else {
        return this.getZindexableContent()
      }
    }
  }
}
