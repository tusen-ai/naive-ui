function createThemeChangeHandler (property) {
  return function (theme) {
    if (property.handleThemeChange) {
      property.handleThemeChange(theme)
    }
  }
}

function getTheme (componentInstance, property, configProviderToWatchThemeChange) {
  let cursor = componentInstance
  let outermostThemedConfigProvider = null
  let theme = null
  while (cursor) {
    const name = cursor.$options.name
    if (name === 'ConfigProvider') {
      while (cursor) {
        if (cursor.syntheticTheme) {
          theme = cursor.syntheticTheme
          outermostThemedConfigProvider = cursor
        }
        cursor = cursor.NConfigProvider
      }
    } else {
      cursor = cursor.$parent
    }
  }
  if (outermostThemedConfigProvider && property && configProviderToWatchThemeChange) {
    if (!configProviderToWatchThemeChange.has(outermostThemedConfigProvider)) {
      outermostThemedConfigProvider.$watch('syntheticTheme', createThemeChangeHandler(property))
      configProviderToWatchThemeChange.add(outermostThemedConfigProvider)
    }
  }
  return { theme, configProvider: outermostThemedConfigProvider }
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
          property.inheritedTheme = theme
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
