import moveoutsideDelegate from '../utils/delegate/moveoutsideDelegate'

const ctx = '@@mousemoveoutsideContext'

function lazyHandler (handler) {
  let called = false
  return function (e) {
    if (called) {
      console.debug('[mousemoveoutside] called')
      handler(e)
    } else {
      console.debug('[mousemoveoutside] lazy called')
      called = true
    }
  }
}

const mousemoveoutside = {
  bind (el, bindings) {
    console.debug('[mousemoveoutside]: bind', el)
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.modifiers.lazy ? lazyHandler(bindings.value) : bindings.value
      }
      moveoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  inserted () {
    console.debug('[mousemoveoutside]: inserted')
  },
  update (el, bindings) {
    console.debug('[mousemoveoutside]: update')
    if (typeof bindings.value === 'function') {
      moveoutsideDelegate.unregisterHandler(el[ctx].handler)
      el[ctx].handler = bindings.value
      moveoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  componentUpdated (el, bindings) {
    console.debug('[mousemoveoutside]: componentUpdated')
    if (typeof bindings.value === 'function') {
      moveoutsideDelegate.unregisterHandler(el[ctx].handler)
      el[ctx].handler = bindings.value
      moveoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  unbind (el) {
    console.debug('[mousemoveoutside]: unbind')
    moveoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default mousemoveoutside
