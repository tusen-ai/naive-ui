class ClickOutsideDelegate {
  constructor () {
    console.debug('[ClickOutsideDelegate]: Ctor called')
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
    console.debug('[ClickOutsideDelegate]: unregisterHandler')
    const h = this.handlers.get(handler)
    if (h) {
      console.debug('[ClickOutsideDelegate.unregisterHandler]: handler found')
      this.handlers.delete(handler)
      --this.handlerCount
      console.debug('[ClickOutsideDelegate.unregisterHandler]: handler unregistered')
    } else {
      console.debug('[ClickOutsideDelegate.unregisterHandler]: handler not found')
    }
    if (!this.handlerCount) {
      console.debug('[ClickOutsideDelegate]: remove handler from window')
      window.removeEventListener('click', this.handleClickOutside)
      this.handlers = new Map()
    }
  }
  registerHandler (els, handler, once = true) {
    if (!Array.isArray(els)) {
      els = [els]
    }
    for (const el of els) {
      if (!el) throw new Error('[ClickOutsideDelegate.registerHandler]: make sure `el` is an HTMLElement')
    }
    if (this.handlers.get(handler)) {
      throw new Error('[ClickOutsideDelegate.registerHandler]: don\'t register duplicate event handler, if you want to do it, unregister this handler and reregister it.')
    }
    if (!this.handlerCount) {
      console.debug('[ClickOutsideDelegate]: add handler to window')
      window.addEventListener('click', this.handleClickOutside)
    }
    ++this.handlerCount
    this.handlers.set(handler, { els, once })
    window.x = this.handlers
  }
}

export default new ClickOutsideDelegate()
