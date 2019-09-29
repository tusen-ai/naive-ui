import Confirm from './src/index.js'

function getTheme (component) {
  let cursor = component
  while (cursor.$parent) {
    const name = cursor.$options.name
    if (cursor.synthesizedTheme) {
      return cursor.synthesizedTheme
    }
    if (name === 'NApp') {
      return cursor.theme || null
    }
    cursor = cursor.$parent
  }
  return null
}

Confirm.install = function (Vue) {
  Confirm.Vue = Vue
  Object.defineProperty(Vue.prototype, '$NModal', {
    get: new Proxy(function () {
      return Confirm
    }, {
      apply (target, thisArg, argumentsList) {
        Confirm.theme = getTheme(thisArg)
        return target.bind(thisArg)(...argumentsList)
      }
    })
  })
}

export default Confirm
