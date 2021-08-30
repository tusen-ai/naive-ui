import { computed, ref } from 'vue'
import { useMemo } from 'vooks'
import {
  NConfigProvider,
  darkTheme,
  enUS,
  zhCN,
  dateEnUS,
  dateZhCN,
  useOsTheme
} from 'naive-ui'
import { TsConfigProvider } from '../../themes/tusimple/src'
import { i18n, useIsMobile } from '../utils/composables'
import {
  createDocumentationMenuOptions,
  createComponentMenuOptions
} from './menu-options'
import hljs from './hljs'

let route = null
let router = null

export function initRouter (_router, _route) {
  route = _route
  router = _router
  localeNameRef = useMemo({
    get () {
      return route.path.startsWith('/zh-CN') ? 'zh-CN' : 'en-US'
    },
    set (locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    }
  })
  dateLocaleRef = useMemo(() => {
    return route.path.startsWith('/zh-CN') ? dateZhCN : dateEnUS
  })
  rawThemeNameRef = useMemo(() => route.params.theme)
  themeNameRef = useMemo({
    get () {
      switch (route.params.theme) {
        case 'os-theme':
          return osThemeRef.value
        case 'dark':
          return 'dark'
        default:
          return 'light'
      }
    },
    set (theme) {
      router.push(changeThemeInPath(route.fullPath, theme))
    }
  })
}

// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug')
const displayModeRef = computed({
  get () {
    return _displayModeRef.value
  },
  set (value) {
    _displayModeRef.value = value
    window.localStorage.setItem('mode', value)
  }
})

// locale
let localeNameRef = null
const localeRef = computed(() => {
  return localeNameRef.value === 'zh-CN' ? zhCN : enUS
})

// useMemo
let dateLocaleRef = null

// theme
const osThemeRef = useOsTheme()
let themeNameRef = null
let rawThemeNameRef = null // could be `os-theme`
const themeRef = computed(() => {
  const { value } = themeNameRef
  return value === 'dark' ? darkTheme : null
})

// config provider
const configProviderNameRef = ref(process.env.TUSIMPLE ? 'tusimple' : 'default')
const configProviderRef = computed(() => {
  return configProviderNameRef.value === 'tusimple'
    ? TsConfigProvider
    : NConfigProvider
})

// options
const docOptionsRef = computed(() =>
  createDocumentationMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = []
  const traverse = (items) => {
    if (!items) return
    items.forEach((item) => {
      if (item.children) traverse(item.children)
      else flattenedItems.push(item)
    })
  }
  traverse(docOptionsRef.value)
  traverse(componentOptionsRef.value)
  return flattenedItems
})

export function siteSetup () {
  i18n.provide(computed(() => localeNameRef.value))
  const isMobileRef = useIsMobile()
  return {
    themeEditorStyle: computed(() => {
      return isMobileRef.value ? 'right: 18px; bottom: 24px;' : undefined
    }),
    configProvider: configProviderRef,
    hljs,
    themeName: themeNameRef,
    theme: themeRef,
    locale: localeRef,
    dateLocale: dateLocaleRef
  }
}

function changeLangInPath (path, lang) {
  const langReg = /^\/(zh-CN|en-US)\//
  return path.replace(langReg, `/${lang}/`)
}

function changeThemeInPath (path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, '$1' + theme)
}

export function push (partialPath) {
  const { fullPath } = route
  router.push(
    fullPath.replace(/(^\/[^/]+\/[^/]+)((\/.*)|$)/, '$1' + partialPath)
  )
}

export function useDisplayMode () {
  return displayModeRef
}

export function useLocaleName () {
  return localeNameRef
}

export function useThemeName () {
  return themeNameRef
}

export function useDocOptions () {
  return docOptionsRef
}

export function useComponentOptions () {
  return componentOptionsRef
}

export function useFlattenedDocOptions () {
  return flattenedDocOptionsRef
}

export function useConfigProviderName () {
  return configProviderNameRef
}
