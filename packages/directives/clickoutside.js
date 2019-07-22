import clickoutsideDelegate from '../utils/clickoutsideDelegate'

const ctx = '@@clickoutsideContext'

const clickoutside = {
  inserted (el, bindings) {
    console.log('[clickoutside]: inserted')
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.value
      }
      clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
    }
  },
  update (el, bindings) {
    if (typeof bindings.value === 'function') {
      clickoutsideDelegate.unregisterHandler(el, el[ctx].handler)
      el[ctx].handler = bindings.value
      clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
    }
  },
  unbind (el) {
    console.log('[clickoutside]: unbind')
    clickoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default clickoutside
