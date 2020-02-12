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
    console.debug('[ZIndexManager.registerElement]: called', el)
    if (this.elementZIndex.has(el)) {
      console.debug('[ZIndexManager.registerElement]: do not register duplicate element')
    } else {
      // console.debug('[ZIndexManager.registerElement]: successfully register', el)
      console.debug('[ZIndexManager.registerElement]: successfully register $el')
      el.style.zIndex = this.nextZIndex
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    }
    this.afterManipulation()
  }
  setNewZIndex (el) {
    console.debug('[ZIndexManager.setNewZIndex]: called')
    if (this.elementZIndex.has(el)) {
      // console.debug('[ZIndexManager.setNewZIndex]: successfully set z-index on', el, `(z-index: ${this.nextZIndex})`)
      console.debug('[ZIndexManager.setNewZIndex]: successfully set z-index on $el' + `(z-index: ${this.nextZIndex})`)

      const currentZIndex = this.elementZIndex.get(el)
      if (currentZIndex + 1 === this.nextZIndex) return
      el.style.zIndex = this.nextZIndex
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    } else {
      console.debug('[ZIndexManager.setNewZIndex]: element not found, please register it first')
    }
    this.afterManipulation()
  }
  unregisterElement (el) {
    console.debug('[ZIndexManager.unregisterElement]: called')
    if (this.elementZIndex.has(el)) {
      console.debug('[ZIndexManager.unregisterElement]: successfully delete $el') //, el)
      this.elementZIndex.delete(el)
    } else {
      console.error(
        '[naive-ui/mixins/zindexable]: Element not found when unregistering.'
      )
    }
    this.afterManipulation()
  }
  afterManipulation () {
    if (!this.elementCount) {
      this.nextZIndex = 2000
    }
    if (this.nextZIndex - this.elementCount > 2500) this.rearrangeZIndex()
  }
  rearrangeZIndex () {
    const elementZIndexPair = Array.from(this.elementZIndex.entries())
    elementZIndexPair.sort((pair1, pair2) => {
      return pair1[1] - pair2[1]
    })
    this.nextZIndex = 2000
    elementZIndexPair.forEach(pair => {
      const el = pair[0]
      const zIndex = this.nextZIndex++
      if (zIndex !== el.style.zIndex) el.style.zIndex = zIndex
    })
  }
}

export default new ZIndexManager()
