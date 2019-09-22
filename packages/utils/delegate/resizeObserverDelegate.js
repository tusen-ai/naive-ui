import ResizeObserver from 'resize-observer-polyfill'

class ResizeObserverDelegate {
  constructor () {
    console.log('resize observer')
    this.handleResize = this.handleResize.bind(this)
    this.observer = new ResizeObserver(this.handleResize)
    this.elHandlersMap = new Map()
  }
  handleResize (entries) {
    for (const entry of entries) {
      const handler = this.elHandlersMap.get(entry.target)
      if (handler) {
        // console.log(entry)
        handler()
      }
    }
  }
  registerHandler (el, handler) {
    this.elHandlersMap.set(el, handler)
    this.observer.observe(el)
  }
  unregisterHandler (el) {
    this.elHandlersMap.delete(el)
    this.observer.unobserve(el)
  }
}

export default new ResizeObserverDelegate()
