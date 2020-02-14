import clickoutsideDelegate from '../_utils/delegate/clickoutsideDelegate'

const ctx = '@@clickoutsideContext'

function lazyHandler (handler) {
  let called = false
  return function (e) {
    if (called) {
      console.debug('[clickoutside] called')
      handler(e)
    } else {
      console.debug('[clickoutside] lazy called')
      called = true
    }
  }
}

const clickoutside = {
  bind (el, bindings) {
    // console.debug('[clickoutside]: bind', el)
    console.debug('[clickoutside]: bind $el')
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.modifiers.lazy ? lazyHandler(bindings.value) : bindings.value
      }
      clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
    }
  },
  inserted (el, bindings) {
    console.debug('[clickoutside]: inserted')
    // if (typeof bindings.value === 'function') {
    //   el[ctx] = {
    //     handler: bindings.modifiers.lazy ? lazyHandler(bindings.value) : bindings.value
    //   }
    //   clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
    // }
  },
  // update (el, bindings) {
  //   console.debug('[clickoutside]: update', el)
  //   if (typeof bindings.value === 'function') {
  //     clickoutsideDelegate.unregisterHandler(el[ctx].handler)
  //     el[ctx].handler = bindings.value
  //     clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
  //   }
  // },
  componentUpdated (el, bindings) {
    console.debug('[clickoutside]: componentUpdated')
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          clickoutsideDelegate.unregisterHandler(el[ctx].handler)
          el[ctx].handler = bindings.value
          clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
        }
      } else {
        el[ctx].handler = bindings.value
        clickoutsideDelegate.registerHandler(el, el[ctx].handler, false)
      }
    } else {
      console.error(
        '[naive-ui/clickoutside]: Binding value is not a function.'
      )
    }
  },
  unbind (el) {
    console.debug('[clickoutside]: unbind')
    clickoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default clickoutside
