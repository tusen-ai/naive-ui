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
  hljs
}) {
  const naive = {
    locales: createLocalesObject(locales),
    fallbackLocale: fallbackLocale || locales[0],
    hljs,
    setHljs,
    setHighlightjs: setHljs,
    install
  }
  function install (Vue) {
    Vue.prototype.$naive = naive
    for (const component of components) {
      component.install(Vue)
    }
  }
  return naive
}

export default create
