
import zIndexManager from '../utils/dom/zIndexManager'

/**
 * watch active on component,
 * acquire new z-index on content when active is set to true
 *
 * dependency:
 * $refs.contentWrapper
 * $vm.active
 */
export default {
  mounted () {
    zIndexManager.registerElement(this.$refs.contentWrapper)
  },
  watch: {
    active (newActive) {
      console.log('[zindexable.watch.active]:', newActive)
      if (newActive) {
        zIndexManager.setNewZIndex(this.$refs.contentWrapper)
      }
    }
  },
  beforeDestroy () {
    zIndexManager.unregisterElement(this.$refs.contentWrapper)
  }
}
