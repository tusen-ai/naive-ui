import clickoutsideDelegate from '../utils/clickoutsideDelegate'

const ctx = '@@clickoutsideContext'

export const clickoutside = {
  inserted (el, bindings) {
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.value
      }
      clickoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  update (el, bindings) {
    if (typeof bindings.value === 'function') {
      clickoutsideDelegate.unregisterHandler(el, el[ctx].handler)
      el[ctx].handler = bindings.value
      clickoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  unbind (el) {
    clickoutsideDelegate.unregisterHandler(el, el[ctx].handler)
  }
}
