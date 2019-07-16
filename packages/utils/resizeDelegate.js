class ResizeDelegate {
  constructor () {
    console.log('ResizeDelegate: Ctor called')
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
      console.log('ResizeDelegate: remove resize handler from window')
      window.removeEventListener('resize', this.handleResize)
    } else {
      // console.log(handler)
      const handlerIndex = handlers.findIndex(h => handler === h)
      // console.log(handlerIndex)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
      }
    }
  }
  registerHandler (handler) {
    if (!this.handlers.length) {
      console.log('ResizeDelegate: add resize handler to window')
      window.addEventListener('resize', this.handleResize, true)
    }
    this.handlers.push(handler)
  }
}

export default new ResizeDelegate()
