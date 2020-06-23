import { read, createHoverColor, createActiveColor } from './_utils/color'

function extendScheme (scheme) {
  const extendedScheme = Object.assign({}, scheme)
  if (extendedScheme.primaryColor) {
    const primaryColorRgb = read(extendedScheme.primaryColor)
    if (!extendedScheme.primaryHoverColor) {
      extendedScheme.primaryHoverColor = createHoverColor(primaryColorRgb)
    }
    if (!extendedScheme.primaryActiveColor) {
      extendedScheme.primaryActiveColor = createActiveColor(primaryColorRgb)
    }
  }
  return extendedScheme
}

function mergeStyleSchemes (baseSchemes, schemes, extend) {
  const mergedSchemes = {}
  Object.keys(baseSchemes).forEach(theme => {
    const scheme = (schemes || {})[theme]
    const extendedScheme = extend ? extendScheme(scheme) : scheme
    mergedSchemes[theme] = Object.assign({}, baseSchemes[theme], extendedScheme)
  })
  return mergedSchemes
}

function setHljs (hljs) {
  this.hljs = hljs
}

function createLocalesObject (locales) {
  return locales && locales.reduce((localesObject, locale) => {
    localesObject[locale._name] = locale
    return localesObject
  }, {})
}

function create ({
  components = [],
  locales,
  fallbackLocale,
  hljs,
  styleSchemes,
  fallbackTheme
}) {
  const installTargets = []
  const naive = {
    locales: createLocalesObject(locales),
    fallbackLocale: fallbackLocale || locales[0],
    hljs,
    styleSchemes: styleSchemes || null,
    fallbackTheme: fallbackTheme || 'light',
    setHljs,
    setHighlightjs: setHljs,
    setStyleSchemes: (schemes, extend = true) => {
      naive.styleSchemes = mergeStyleSchemes(
        naive.styleSchemes, schemes, extend
      )
    },
    install
  }
  function install (Vue) {
    if (installTargets.includes(Vue)) return
    installTargets.push(Vue)
    Vue.prototype.$naive = naive
    for (const component of components) {
      component.install(Vue)
    }
  }
  return naive
}

export default create
