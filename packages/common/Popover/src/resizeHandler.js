class ResizeHandler {
  constructor () {
    console.log('ctor called once')
    this.handlers = []
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
      console.log('remove resize handler from window')
      window.removeEventListener('resize', this.handleResize.bind(this))
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
      console.log('add resize handler to window')
      window.addEventListener('resize', this.handleResize.bind(this), true)
    }
    this.handlers.push(handler)
  }
}

export default new ResizeHandler()
