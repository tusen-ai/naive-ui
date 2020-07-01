class MutationObserverDelegate {
  constructor () {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[MutationObserverDelegate]: Ctor called')
    }
    this.handlers = new Map()
    this.observers = new Map()
    this.handleMutation = this.handleMutation.bind(this)
  }
  handleMutation (mutationList) {
    for (const mutationRecord of mutationList) {
      const handlers = this.handlers.get(mutationRecord.target)
      if (handlers) {
        for (const handler of handlers) {
          handler()
        }
      }
    }
  }
  unregisterHandler (el, handler) {
    const handlers = this.handlers.get(el)
    if (handlers) {
      const handlerIndex = handlers.findIndex(h => handler === h)
      if (~handlerIndex) {
        handlers.splice(handlerIndex, 1)
      }
      if (!handler.length) {
        this.handlers.delete(el)
        const observer = this.observers.get(el)
        if (observer) this.observer.disconnect()
        this.observers.delete(el)
      }
    }
  }
  registerHandler (el, handler) {
    if (this.handlers.get(el)) {
      this.handlers.get(el).push(handler)
    } else {
      const observer = new MutationObserver(mutationList => {
        this.handleMutation(mutationList)
      })
      this.observers.set(el, observer)
      this.handlers.set(el, [handler])
      observer.observe(el, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
  }
}

export default new MutationObserverDelegate()
