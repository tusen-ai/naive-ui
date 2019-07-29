// class MinHeap {

// }

class ZIndexManager {
  constructor () {
    console.debug('[ZIndexManager]: Ctor called')
    this.elementZIndex = new Map()
    this.nextZIndex = 2000
  }
  get elementCount () {
    return this.elementZIndex.size
  }
  registerElement (el) {
    console.debug('[ZIndexManager.registerElement]: called')
    if (this.elementZIndex.has(el)) {
      console.debug('[ZIndexManager.registerElement]: do not register duplicate element')
    } else {
      console.debug('[ZIndexManager.registerElement]: successfully register', el)
      el.style.zIndex = this.nextZIndex
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    }
  }
  setNewZIndex (el) {
    console.debug('[ZIndexManager.setNewZIndex]: called')
    if (this.elementZIndex.has(el)) {
      console.debug('[ZIndexManager.setNewZIndex]: successfully set z-index on', el, `(z-index: ${this.nextZIndex})`)
      const currentZIndex = this.elementZIndex.get(el)
      if (currentZIndex + 1 === this.nextZIndex) return
      el.style.zIndex = this.nextZIndex
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    } else {
      console.debug('[ZIndexManager.setNewZIndex]: element not found, please register it first')
    }
  }
  unregisterElement (el) {
    console.debug('[ZIndexManager.unregisterElement]: called')
    if (this.elementZIndex.has(el)) {
      console.debug('[ZIndexManager.unregisterElement]: successfully delete', el)
      this.elementZIndex.delete(el)
    } else {
      console.log('[ZIndexManager.unregisterElement]: element not found')
    }
    if (!this.elementCount) {
      this.nextZIndex = 2000
    }
  }
}

export default new ZIndexManager()
