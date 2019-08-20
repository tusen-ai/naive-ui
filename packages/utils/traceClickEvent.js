/**
 * This file is currently of no use
 */

let memorizedClickEvent = null

class ClickTracer {
  constructor () {
    window.removeEventListener('click', ClickTracer.traceClickEvent, true)
    window.addEventListener('click', ClickTracer.traceClickEvent, true)
  }
  static traceClickEvent (e) {
    memorizedClickEvent = e
  }
  get memorizedClickEvent () {
    return memorizedClickEvent
  }
}

export default new ClickTracer()
