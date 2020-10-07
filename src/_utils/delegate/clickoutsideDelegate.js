class ClickOutsideDelegate {
  constructor () {
    this.handlers = new Map()
    this.handlerCount = 0
    this.mouseDownTarget = null
    this.handleMouseUpOutside = this.handleMouseUpOutside.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }
  handleMouseDown (e) {
    this.mouseDownTarget = e.target
  }
  handleMouseUpOutside (e) {
    const { target } = e
    for (const [handler, { els }] of this.handlers) {
      let existElContainTarget = false
      for (const el of els) {
        if (el && (el.contains(target) || el.contains(this.mouseDownTarget))) {
          existElContainTarget = true
          break
        }
      }
      if (existElContainTarget) continue
      else {
        handler(e)
      }
    }
  }
  unregisterHandler (handler) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ClickOutsideDelegate]: unregisterHandler')
    }
    const h = this.handlers.get(handler)
    if (h) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ClickOutsideDelegate.unregisterHandler]: handler found')
      }
      this.handlers.delete(handler)
      --this.handlerCount
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ClickOutsideDelegate.unregisterHandler]: handler unregistered')
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ClickOutsideDelegate.unregisterHandler]: handler not found')
      }
    }
    if (!this.handlerCount) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ClickOutsideDelegate]: remove handler from window')
      }
      window.removeEventListener('mouseup', this.handleMouseUpOutside)
      window.removeEventListener('mousedown', this.handleMouseDown)
      this.mouseDownTarget = null
      this.handlers = new Map()
    }
  }
  registerHandler (els, handler) {
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
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ClickOutsideDelegate]: add handler to window')
      }
      window.addEventListener('mouseup', this.handleMouseUpOutside)
      window.addEventListener('mousedown', this.handleMouseDown)
    }
    ++this.handlerCount
    this.handlers.set(handler, { els })
    window.x = this.handlers
  }
}

export default new ClickOutsideDelegate()
