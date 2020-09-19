import zIndexManager from '../_utils/dom/zIndexManager'

const zindexable = {
  mounted (el, { value }) {
    const { zIndex, enabled } = (value || {})
    zIndexManager.registerElement(el, zIndex)
    el.zindexableContext = {
      enabled
    }
  },
  updated (el, { value }) {
    const { zIndex, enabled } = (value || {})
    const cachedEnabled = el.zindexableContext.enabled
    if (enabled && cachedEnabled !== enabled) {
      zIndexManager.setNewZIndex(el, zIndex)
    }
    el.zindexableContext.enabled = enabled
  },
  unmounted (el) {
    // TODO: bug, sometimes vue will unmount popover twice when change route
    if (el.zindexableContext.unmounted) return
    el.zindexableContext.unmounted = true
    zIndexManager.unregisterElement(el)
  }
}

export default zindexable
