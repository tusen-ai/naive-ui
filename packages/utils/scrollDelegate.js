class ScrollDelegate {
  constructor () {
    console.log('ScrollDelegate: Ctor called')
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
      // console.log(handler)
      const handlerIndex = handlers.findIndex(h => handler === h)
      // console.log(handlerIndex)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
        --this.handlerCount
      }
    }
    if (!this.handlerCount) {
      console.log('ScrollDelegate: remove handler from window')
      window.removeEventListener('scroll', this.handleScroll)
      this.handlers = new Map()
    }
  }
  registerHandler (el, handler) {
    if (!this.handlerCount) {
      console.log('ScrollDelegate: add handler to window')
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
