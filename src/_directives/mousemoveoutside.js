import { debug, warn } from '../_utils'
import { on, off } from 'evtd'

const ctx = '@@mmoContext'

const mousemoveoutside = {
  beforeMount (el, bindings) {
    if (__DEV__) {
      debug('mousemoveoutside', 'bind $el')
    }
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.value
      }
      on('mousemoveoutside', el, el[ctx].handler)
    }
  },
  mounted () {
    if (__DEV__) {
      debug('mousemoveoutside', 'inserted')
    }
  },
  updated (el, bindings) {
    if (__DEV__) {
      debug('mousemoveoutside', 'componentUpdated')
    }
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          off('mousemoveoutside', el, el[ctx].handler)
          el[ctx].handler = bindings.value
          on('mousemoveoutside', el, el[ctx].handler)
        }
      } else {
        el[ctx].handler = bindings.value
        on('mousemoveoutside', el, el[ctx].handler)
      }
    } else {
      warn('mousemoveoutside', 'Binding value is not a function.')
    }
  },
  unmounted (el) {
    if (__DEV__) {
      debug('mousemoveoutside', 'unbind')
    }
    off('mousemoveoutside', el, el[ctx].handler)
  }
}

export default mousemoveoutside
