function mergeStyleSchemes (baseSchemes, schemes) {
  const mergedSchemes = {}
  Object.keys(baseSchemes).forEach(theme => {
    const baseScheme = baseSchemes[theme]
    const scheme = (schemes || {})[theme]
    mergedSchemes[theme] = baseScheme.customize(scheme)
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
  fallbackTheme,
  _themes
}) {
  const installTargets = []
  const naive = {
    locales: createLocalesObject(locales),
    fallbackLocale: fallbackLocale || locales[0],
    hljs,
    styleSchemes: styleSchemes || null,
    _themes: _themes || null,
    fallbackTheme: fallbackTheme || 'light',
    setHljs,
    setHighlightjs: setHljs,
    setStyleSchemes: schemes => {
      naive.styleSchemes = mergeStyleSchemes(
        naive.styleSchemes, schemes
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
