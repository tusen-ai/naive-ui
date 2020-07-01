class ScrollDelegate {
  constructor () {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ScrollDelegate]: Ctor called')
    }
    this.handlers = new Map()
    this.handlerCount = 0
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll (e) {
    const handlers = this.handlers.get(e.target)
    if (handlers) {
      for (const handler of handlers) {
        handler(e)
      }
    }
  }
  unregisterHandler (el, handler) {
    const handlers = this.handlers.get(el)
    if (handlers) {
      // console.debug(handler)
      const handlerIndex = handlers.findIndex(h => handler === h)
      // console.debug(handlerIndex)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
        --this.handlerCount
      }
      if (!handlers.length) {
        this.handlers.delete(el)
      }
    }
    if (!this.handlerCount) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ScrollDelegate]: remove handler from window')
      }
      window.removeEventListener('scroll', this.handleScroll, true)
      this.handlers = new Map()
    }
  }
  registerHandler (el, handler) {
    if (!this.handlerCount) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ScrollDelegate]: add handler to window')
      }
      window.addEventListener('scroll', this.handleScroll, true)
    }
    ++this.handlerCount
    if (this.handlers.get(el)) {
      this.handlers.get(el).push(handler)
    } else {
      this.handlers.set(el, [handler])
    }
  }
}

export default new ScrollDelegate()
