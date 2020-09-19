
import zIndexManager from '../_utils/dom/zIndexManager'

/**
 * @deprecated
 * watch zindexableEnabled on component,
 * acquire new z-index on content when zindexableEnabled is set to true
 *
 * dependency:
 * $vm.zindexableEnabled
 * $vm.zindexableGetElement
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
  beforeUnmount () {
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
      return this.zindexableGetElement()
    }
  }
}
