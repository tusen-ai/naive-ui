function getTheme (componentInstance, property) {
  let cursor = componentInstance
  while (cursor.$parent) {
    const name = cursor.$options.name
    if (cursor.synthesizedTheme) {
      return cursor.synthesizedTheme
    }
    if (name === 'NConfigProvider') {
      return cursor.synthesizedTheme || null
    }
    cursor = cursor.$parent
  }
  return null
}

function install (Vue, property, name) {
  const prototypeProxy = new Proxy(
    function () {
      return property
    },
    {
      apply (target, thisArg, argumentsList) {
        if (thisArg instanceof Vue) {
          property.theme = getTheme(thisArg, property)
        }
        return target.bind(thisArg)(...argumentsList)
      }
    }
  )
  Object.defineProperty(Vue.prototype, name, {
    get: prototypeProxy
  })
}

export { getTheme, install }
