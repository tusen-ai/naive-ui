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

function install (Vue, Component, name) {
  const prototypeProxy = new Proxy(function () {
    return Component
  }, {
    apply (target, thisArg, argumentsList) {
      Component.theme = getTheme(thisArg)
      return target.bind(thisArg)(...argumentsList)
    }
  })
  Object.defineProperty(Vue.prototype, name, {
    get: prototypeProxy
  })
}

export default install
