
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
    zIndexManager.registerElement(this.$refs.contentContainer)
  },
  watch: {
    active (newActive) {
      console.debug('[zindexable.watch.active]:', newActive)
      if (newActive) {
        zIndexManager.setNewZIndex(this.$refs.contentContainer)
      }
    }
  },
  beforeDestroy () {
    zIndexManager.unregisterElement(this.$refs.contentContainer)
  }
}
