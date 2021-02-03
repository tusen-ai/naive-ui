import { App } from 'vue'
import version from './version'
import { NLocale } from './locales'
import type { Hljs } from './_mixins'

type ComponentType = any

interface NUiInstance {
  version: string
  componentPrefix: string
  install: (app: App) => void
  /** @deprecated */
  use: (plugin: { install: (naive: NUiInstance) => void }) => void
  /** @deprecated */
  hljs?: Hljs
  /** @deprecated */
  setHljs: (hljs: Hljs) => void
  /** @deprecated */
  setHighlightjs: (hljs: Hljs) => void
  /** @deprecated */
  locales: Record<string, NLocale>
  /** @deprecated */
  fallbackLocale: NLocale
}

interface NUiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
  /** @deprecated */
  locales?: NLocale[]
  /** @deprecated */
  hljs?: Hljs
}

function setHljs (this: NUiInstance, hljs: Hljs): void {
  this.hljs = hljs
}

function createLocalesObject (locales: NLocale[]): { [key: string]: NLocale } {
  const defaultLocaleMap: { [key: string]: NLocale } = {}
  return locales.reduce((localeMap, locale) => {
    localeMap[locale.name] = locale
    return localeMap
  }, defaultLocaleMap)
}

function create ({
  componentPrefix = 'N',
  components = [],
  locales = [],
  hljs = undefined
}: NUiCreateOptions = {}): NUiInstance {
  const fallbackLocale = locales[0]
  const installTargets: App[] = []
  const naive: NUiInstance = {
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
  function registerComponent (
    app: App,
    name: string,
    component: ComponentType
  ): void {
    const registered = app.component(componentPrefix + name)
    if (!registered) {
      app.component(componentPrefix + name, component)
    }
  }
  function install (app: App): void {
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
