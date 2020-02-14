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
        if (cursor.syntheticTheme) {
          theme = cursor.syntheticTheme
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
      lastThemedConfigProvider.$watch('syntheticTheme', createThemeChangeHandler(property))
      configProviderToWatchThemeChange.add(lastThemedConfigProvider)
    }
  }
  return { theme, configProvider: lastThemedConfigProvider }
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
          const { theme } = getTheme(thisArg, property, configProviderToWatchThemeChange)
          property.theme = theme
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
