import { warn } from '../_utils/naive'
import { on, off } from 'evtd'

const ctx = '@@coContext'

const clickoutside = {
  mounted (el, bindings) {
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.value
      }
      on('clickoutside', el, el[ctx].handler)
    }
  },
  updated (el, bindings) {
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          off('clickoutside', el, el[ctx].handler)
          el[ctx].handler = bindings.value
          on('clickoutside', el, el[ctx].handler)
        }
      } else {
        el[ctx].handler = bindings.value
        on('clickoutside', el, el[ctx].handler)
      }
    } else if (__DEV__) {
      warn('clickoutside', 'Binding value is not a function.')
    }
  },
  unmounted (el) {
    off('clickoutside', el, el[ctx].handler)
  }
}

export default clickoutside
