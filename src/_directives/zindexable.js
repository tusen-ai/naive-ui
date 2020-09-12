import zIndexManager from '../_utils/dom/zIndexManager'

const zindexable = {
  beforeMount (el, { value }) {
    const { zIndex, enabled } = (value || {})
    zIndexManager.registerElement(el, zIndex)
    el.zindexableContext = {
      enabled
    }
  },
  updated (el, { value }) {
    const { zIndex, enabled } = (value || {})
    const cachedEnabled = el.zindexableContext.enabled
    if (cachedEnabled !== enabled) {
      zIndexManager.setNewZIndex(el, zIndex)
      el.zindexableContext.enabled = enabled
    }
  },
  unmounted (el) {
    zIndexManager.unregisterElement(el)
  }
}

export default zindexable
