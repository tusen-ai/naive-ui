import { warn, debug } from '../../_utils/naive'

class ZIndexManager {
  constructor () {
    if (__DEV__) {
      debug('z-index-manager', 'Ctor called.')
    }
    this.elementZIndex = new Map()
    this.nextZIndex = 2000
  }

  get elementCount () {
    return this.elementZIndex.size
  }

  registerElement (el, zIndex) {
    if (__DEV__) {
      debug('z-index-manager/register-element', 'Called.')
    }
    if (this.elementZIndex.has(el)) {
      if (__DEV__) {
        debug('z-index-manager/register-element', 'Do not register duplicate element.')
      }
    } else {
      if (__DEV__) {
        debug('z-index-manager/register-element', 'Successfully registered.')
      }
      el.style.zIndex = this.nextZIndex
      if (zIndex !== undefined) {
        el.style.zIndex = zIndex
        this.elementZIndex.set(el, null)
        return
      }
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    }
    this.afterManipulation()
  }

  setNewZIndex (el, zIndex) {
    if (__DEV__) {
      debug('z-index-manager/set-new-z-index', 'Called.')
    }
    if (this.elementZIndex.has(el)) {
      if (__DEV__) {
        debug('z-index-manager/set-new-z-index', `Successfully set z-index ${this.nextZIndex}.`)
      }
      if (zIndex !== undefined) {
        el.style.zIndex = zIndex
        this.elementZIndex.set(el, null)
        return
      }
      const currentZIndex = this.elementZIndex.get(el)
      if (currentZIndex !== null && currentZIndex + 1 === this.nextZIndex) return
      el.style.zIndex = this.nextZIndex
      this.elementZIndex.set(el, this.nextZIndex)
      this.nextZIndex++
    } else {
      if (__DEV__) {
        debug('z-index-manager/set-new-z-index', 'Element not found, please register it first.')
      }
    }
    this.afterManipulation()
  }

  unregisterElement (el) {
    if (__DEV__) {
      debug('z-index-manager/unregister-element', 'Called.')
    }
    if (this.elementZIndex.has(el)) {
      if (__DEV__) {
        debug('z-index-manager/unregister-element', 'Successfully deleted.')
      }
      this.elementZIndex.delete(el)
    } else {
      warn('z-index-manager/unregister-element', 'Element not found when unregistering.')
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
