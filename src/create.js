import version from './version'
import { warn } from './_utils'

function setHljs (hljs) {
  this.hljs = hljs
}

function createLocalesObject (locales) {
  return (
    locales &&
    locales.reduce((localeMap, locale) => {
      localeMap[locale._name] = locale
      return localeMap
    }, {})
  )
}

function create ({
  componentPrefix = 'N',
  components = [],
  locales = [],
  hljs
} = {}) {
  const fallbackLocale = locales[0]
  if (!fallbackLocale) warn('create', '`locales` is empty.')
  const installTargets = []
  const naive = {
    version,
    use (plugin) {
      plugin.install(naive)
    },
    install,
    // deprecated
    componentPrefix,
    hljs,
    setHljs,
    setHighlightjs: setHljs,
    locales: createLocalesObject(locales),
    fallbackLocale
  }
  function registerComponent (app, name, component) {
    const registered = app.component(componentPrefix + name)
    if (!registered) {
      app.component(componentPrefix + name, component)
    }
  }
  function install (app) {
    if (installTargets.includes(app)) return
    installTargets.push(app)
    app.config.globalProperties.$naive = naive
    components.forEach((component) => {
      const { name, alias } = component
      registerComponent(app, name, component)
      if (alias) {
        alias.forEach((aliasName) => {
          registerComponent(app, aliasName, component)
        })
      }
    })
  }
  return naive
}

export default create
