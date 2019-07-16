class ClickOutsideDelegate {
  constructor () {
    console.log('ClickOutsideDelegate: Ctor called')
    this.handlers = new Map()
    this.handlerCount = 0
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }
  handleClickOutside (e) {
    const target = e.target
    for (const [handler, { els, once }] of this.handlers) {
      let existElContainTarget = false
      for (const el of els) {
        if (el) {
          if (typeof el === 'function') {
            const unwrappedEl = el()
            if (unwrappedEl && unwrappedEl.contains(target)) {
              existElContainTarget = true
              break
            }
          } else if (el.contains(target)) {
            existElContainTarget = true
            break
          }
        }
      }
      if (existElContainTarget) continue
      else {
        handler(e)
        if (once) {
          this.unregisterHandler(handler)
        }
      }
    }
  }
  unregisterHandler (handler) {
    console.log('[ClickOutsideDelegate.unregisterHandler]')
    const h = this.handlers.get(handler)
    if (h) {
      this.handlers.delete(h)
      --this.handlerCount
    }
    if (!this.handlerCount) {
      console.log('ClickOutsideDelegate: remove handler from window')
      window.removeEventListener('click', this.handleClickOutside.bind(this))
      this.handlers = new Map()
    }
  }
  registerHandler (els, handler, once = true) {
    if (!Array.isArray(els)) {
      els = [els]
    }
    for (const el of els) {
      if (!el) throw new Error('[ClickOutsideDelegate.registerHandler] make sure `el` is an HTMLElement')
    }
    if (this.handlers.get(handler)) {
      throw new Error('[ClickOutsideDelegate.registerHandler] don\'t register duplicate event handler')
    }
    if (!this.handlerCount) {
      console.log('ClickOutsideDelegate: add handler to window')
      window.addEventListener('click', this.handleClickOutside.bind(this), true)
    }
    ++this.handlerCount
    this.handlers.set(handler, { els, once })
    window.x = this.handlers
  }
}

export default new ClickOutsideDelegate()
