class ScrollHandler {
  constructor () {
    console.log('ctor called once')
    this.handlers = new Map()
    this.handlerCount = 0
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
    --this.handlerCount
    if (!this.handlerCount) {
      console.log('remove handler from window')
      window.removeEventListener('scroll', this.handleScroll.bind(this))
    }
    if (handlers) {
      // console.log(handler)
      const handlerIndex = handlers.findIndex(h => handler === h)
      // console.log(handlerIndex)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
      }
    }
  }
  registerHandler (el, handler) {
    if (!this.handlerCount) {
      console.log('add handler to window')
      window.addEventListener('scroll', this.handleScroll.bind(this), true)
    }
    ++this.handlerCount
    if (this.handlers.get(el)) {
      this.handlers.get(el).push(handler)
    } else {
      this.handlers.set(el, [handler])
    }
    window.x = this.handlers
  }
}

export default new ScrollHandler()
