import { warn } from '../_utils/naive'
import clickoutsideDelegate from '../_utils/delegate/clickoutsideDelegate'

const ctx = '@@coContext'

const clickoutside = {
  mounted (el, bindings) {
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.value
      }
      clickoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  updated (el, bindings) {
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          clickoutsideDelegate.unregisterHandler(el[ctx].handler)
          el[ctx].handler = bindings.value
          clickoutsideDelegate.registerHandler(el, el[ctx].handler)
        }
      } else {
        el[ctx].handler = bindings.value
        clickoutsideDelegate.registerHandler(el, el[ctx].handler)
      }
    } else if (__DEV__) {
      warn('clickoutside', 'Binding value is not a function.')
    }
  },
  unmounted (el) {
    el[ctx] && clickoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default clickoutside
