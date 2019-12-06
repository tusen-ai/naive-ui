function createThemeChangeHandler (property) {
  return function (theme) {
    if (property.handleThemeChange) {
      property.handleThemeChange(theme)
    }
  }
}

function getTheme (componentInstance, property, configProviderToWatchThemeChange) {
  let cursor = componentInstance
  let lastThemedConfigProvider = null
  let theme = null
  while (cursor) {
    const name = cursor.$options.name
    if (name === 'NConfigProvider') {
      while (cursor) {
        if (cursor.synthesizedTheme) {
          theme = cursor.synthesizedTheme
          lastThemedConfigProvider = cursor
        }
        cursor = cursor.NConfigProvider
      }
    } else {
      cursor = cursor.$parent
    }
  }
  if (lastThemedConfigProvider && property && configProviderToWatchThemeChange) {
    if (!configProviderToWatchThemeChange.has(lastThemedConfigProvider)) {
      lastThemedConfigProvider.$watch('synthesizedTheme', createThemeChangeHandler(property))
      configProviderToWatchThemeChange.add(lastThemedConfigProvider)
    }
  }
  console.log('getTheme', theme)
  return theme
}

function install (Vue, property, name) {
  const configProviderToWatchThemeChange = new WeakSet()
  property.getTheme = getTheme
  const prototypeProxy = new Proxy(
    function () {
      return property
    },
    {
      apply (target, thisArg, argumentsList) {
        if (thisArg instanceof Vue) {
          property.theme = getTheme(thisArg, property, configProviderToWatchThemeChange)
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
