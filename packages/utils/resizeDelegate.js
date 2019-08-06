class ResizeDelegate {
  constructor () {
    console.debug('[ResizeDelegate]: Ctor called')
    this.handlers = []
    this.handleResize = this.handleResize.bind(this)
  }
  handleResize (e) {
    const handlers = this.handlers
    if (handlers.length) {
      for (const handler of handlers) {
        handler(e)
      }
    }
  }
  unregisterHandler (handler) {
    const handlers = this.handlers
    if (handlers.length) {
      // console.debug(handler)
      const handlerIndex = handlers.findIndex(h => handler === h)
      // console.debug(handlerIndex)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
      }
    }
    if (!handlers.length) {
      console.debug('[ResizeDelegate]: remove resize handler from window')
      window.removeEventListener('resize', this.handleResize, true)
    }
  }
  registerHandler (handler) {
    if (!this.handlers.length) {
      console.debug('[ResizeDelegate]: add resize handler to window')
      window.addEventListener('resize', this.handleResize, true)
    }
    this.handlers.push(handler)
  }
}

export default new ResizeDelegate()
