import version from './version'

function setHljs (hljs) {
  this.hljs = hljs
}

function createLocalesObject (locales) {
  return locales && locales.reduce((localesObject, locale) => {
    localesObject[locale._name] = locale
    return localesObject
  }, {})
}

function createStylesObject (styles) {
  const stylesObject = {}
  function traverse (rootStyles) {
    rootStyles.forEach(style => {
      if (!stylesObject[style.theme]) {
        stylesObject[style.theme] = {}
        stylesObject[style.theme].override = (...args) => {
          stylesObject[style.theme].base.override(...args)
        }
      }
      if (!stylesObject[style.theme][style.name]) {
        stylesObject[style.theme][style.name] = style
      }
      if (style.peer) {
        traverse(style.peer)
      }
    })
  }
  traverse(styles)
  return stylesObject
}

function create ({
  componentPrefix = 'N',
  components = [],
  styles = [],
  locales,
  fallbackLocale,
  hljs,
  fallbackTheme
}) {
  const installTargets = []
  const naive = {
    componentPrefix,
    locales: createLocalesObject(locales),
    fallbackLocale: fallbackLocale || locales[0],
    hljs,
    components: {},
    styles: createStylesObject(styles),
    fallbackTheme: fallbackTheme || 'light',
    // external
    version,
    setHljs,
    setHighlightjs: setHljs,
    use (plugin) {
      plugin.install(naive)
    },
    install
  }
  function install (Vue) {
    if (installTargets.includes(Vue)) return
    installTargets.push(Vue)
    Vue.prototype.$naive = naive
    for (const component of components) {
      component.install(Vue, naive)
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (!window.naive) window.naive = {}
    window.naive.styles = styles
  }
  return naive
}

export default create
