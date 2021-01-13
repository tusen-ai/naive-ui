import { App } from 'vue'
import version from './version'
import { warn } from './_utils'
import { Hljs, NaiveLocale } from './config-provider'

type ComponentType = any

interface NaiveUIInstance {
  version: string
  install (app: App): void
  use (plugin: { install: (naive: NaiveUIInstance) => void }): void
  componentPrefix: string
  hljs: any
  setHljs (hljs: any): void
  setHighlightjs (hljs: any): void
  locales: Record<string, NaiveLocale>
  fallbackLocale: NaiveLocale
}

interface NaiveUICreateOptions {
  componentPrefix?: string
  components?: ComponentType[]
  locales?: NaiveLocale[]
  hljs?: Hljs
}

function setHljs (this: NaiveUIInstance, hljs: any) {
  this.hljs = hljs
}

function createLocalesObject (locales: NaiveLocale[]) {
  return (
    locales &&
    locales.reduce((localeMap, locale) => {
      localeMap[locale.name] = locale
      return localeMap
    }, {})
  )
}

function create ({
  componentPrefix = 'N',
  components = [],
  locales = [],
  hljs = undefined
}: NaiveUICreateOptions = {}) {
  const fallbackLocale = locales[0]
  if (!fallbackLocale) warn('create', '`locales` is empty.')
  const installTargets: App[] = []
  const naive: NaiveUIInstance = {
    version,
    use (plugin: any) {
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
  function registerComponent (app: App, name: string, component: ComponentType) {
    const registered = app.component(componentPrefix + name)
    if (!registered) {
      app.component(componentPrefix + name, component)
    }
  }
  function install (app: App) {
    if (installTargets.includes(app)) return
    installTargets.push(app)
    app.config.globalProperties.$naive = naive
    components.forEach((component) => {
      const { name, alias } = component
      registerComponent(app, name, component)
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component)
        })
      }
    })
  }
  return naive
}

export default create
