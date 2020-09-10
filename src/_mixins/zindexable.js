
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
    if (this.zindexableEnabled) this._initZindexable()
  },
  watch: {
    zindexableElementDisplayed (value) {
      if (!this.zindexableEnabled) return
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[zindexable.watch.zindexableElementDisplayed]:', value)
      }
      if (value) {
        this._initZindexable()
        zIndexManager.setNewZIndex(this._zindexableGetElement(), this.zIndex)
      }
    }
  },
  data () {
    return {
      zindexableInitialized: false
    }
  },
  beforeDestroy () {
    if (!this.zindexableEnabled) return
    if (this.zindexableInitialized) {
      zIndexManager.unregisterElement(this._zindexableGetElement())
    }
  },
  methods: {
    _initZindexable () {
      if (!this.zindexableInitialized) {
        zIndexManager.registerElement(this._zindexableGetElement(), this.zIndex)
        this.zindexableInitialized = true
      }
    },
    _zindexableGetElement () {
      const refs = this.$refs
      if (refs.contentContainer) {
        return refs.contentContainer
      } else {
        return this.zindexableGetElement()
      }
    }
  }
}
