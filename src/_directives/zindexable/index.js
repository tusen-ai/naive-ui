import zIndexManager from './z-index-manager'

const ctx = '@@ziContext'

const zindexable = {
  mounted (el, { value }) {
    const { zIndex, enabled } = (value || {})
    zIndexManager.registerElement(el, zIndex)
    el[ctx] = {
      enabled
    }
  },
  updated (el, { value }) {
    const { zIndex, enabled } = (value || {})
    const cachedEnabled = el[ctx].enabled
    if (enabled && cachedEnabled !== enabled) {
      zIndexManager.setNewZIndex(el, zIndex)
    }
    el[ctx].enabled = enabled
  },
  unmounted (el) {
    if (el[ctx].unmounted) return
    el[ctx].unmounted = true
    zIndexManager.unregisterElement(el)
  }
}

export default zindexable
