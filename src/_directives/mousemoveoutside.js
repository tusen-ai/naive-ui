import moveoutsideDelegate from '../_utils/delegate/moveoutsideDelegate'

const ctx = '@@mmoContext'

function lazyHandler (handler) {
  let called = false
  return function (e) {
    if (called) {
      if (__DEV__) {
        console.debug('[mousemoveoutside] called')
      }
      handler(e)
    } else {
      if (__DEV__) {
        console.debug('[mousemoveoutside] lazy called')
      }
      called = true
    }
  }
}

const mousemoveoutside = {
  beforeMount (el, bindings) {
    if (__DEV__) {
      console.debug('[mousemoveoutside]: bind $el')
    }
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.modifiers.lazy ? lazyHandler(bindings.value) : bindings.value
      }
      moveoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  mounted () {
    if (__DEV__) {
      console.debug('[mousemoveoutside]: inserted')
    }
  },
  updated (el, bindings) {
    if (__DEV__) {
      console.debug('[mousemoveoutside]: componentUpdated')
    }
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          moveoutsideDelegate.unregisterHandler(el[ctx].handler)
          el[ctx].handler = bindings.value
          moveoutsideDelegate.registerHandler(el, el[ctx].handler)
        }
      } else {
        el[ctx].handler = bindings.value
        moveoutsideDelegate.registerHandler(el, el[ctx].handler)
      }
    } else {
      console.error(
        '[naive-ui/mousemoveoutside]: Binding value is not a function.'
      )
    }
  },
  unmounted (el) {
    if (__DEV__) {
      console.debug('[mousemoveoutside]: unbind')
    }
    moveoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default mousemoveoutside
