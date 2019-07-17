class MoveOutsideDelegate {
  constructor () {
    console.debug('[MoveOutsideDelegate]: Ctor called')
    this.handlers = new Map()
    this.handlerCount = 0
    this.handleMoveOutside = this.handleMoveOutside.bind(this)
  }
  handleMoveOutside (e) {
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
    console.debug('[MoveOutsideDelegate]: unregisterHandler')
    const h = this.handlers.get(handler)
    if (h) {
      this.handlers.delete(handler)
      --this.handlerCount
    }
    if (!this.handlerCount) {
      console.debug('[MoveOutsideDelegate]: remove handler from window')
      window.removeEventListener('mousemove', this.handleMoveOutside, true)
      this.handlers = new Map()
    }
  }
  registerHandler (els, handler, once = true) {
    if (!Array.isArray(els)) {
      els = [els]
    }
    for (const el of els) {
      if (!el) throw new Error('[MoveOutsideDelegate.registerHandler]: make sure `el` is an HTMLElement')
    }
    if (this.handlers.get(handler)) {
      this.handlers.set(handler, { els, once })
      return
    }
    if (!this.handlerCount) {
      console.debug('[MoveOutsideDelegate]: add handler to window')
      window.addEventListener('mousemove', this.handleMoveOutside, true)
    }
    ++this.handlerCount
    this.handlers.set(handler, { els, once })
  }
}

export default new MoveOutsideDelegate()
