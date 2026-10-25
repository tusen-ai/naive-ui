import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  NConfigProvider,
  useOsTheme,
  zhCN
} from 'naive-ui'
import { useMemo } from 'vooks'
import { computed, ref, watchEffect } from 'vue'
import { TsConfigProvider } from '../../themes/tusimple/src'
import { i18n, useIsMobile } from '../utils/composables'
import hljs from './hljs'
import {
  createComponentMenuOptions,
  createDocumentationMenuOptions
} from './menu-options'

let route = null
let router = null
// locale
let localeNameRef = null
// useMemo
let dateLocaleRef = null
// theme
// The theme is the reader's preference, not part of the page, so it lives in
// localStorage rather than the URL. `os-theme` (the default) follows the OS.
// index.html applies the same preference before the first paint.
const THEME_STORAGE_KEY = 'naive-ui-theme'
const osThemeRef = useOsTheme()
function readThemePreference() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'os-theme'
  }
  catch {
    return 'os-theme'
  }
}
const themePreferenceRef = ref(readThemePreference())
// Keep other tabs in step when the preference changes in one of them
window.addEventListener('storage', (e) => {
  if (e.key === THEME_STORAGE_KEY || e.key === null) {
    themePreferenceRef.value = readThemePreference()
  }
})
function setThemePreference(theme) {
  themePreferenceRef.value = theme
  try {
    if (theme === 'os-theme')
      window.localStorage.removeItem(THEME_STORAGE_KEY)
    else window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }
  catch {}
}
// What the reader picked: `light`, `dark` or `os-theme`
const themePreferenceModelRef = computed({
  get: () => themePreferenceRef.value,
  set: setThemePreference
})
// The theme in effect, `light` or `dark`; setting it stores the preference
const themeNameRef = computed({
  get() {
    const { value } = themePreferenceRef
    return value === 'os-theme' ? (osThemeRef.value ?? 'light') : value
  },
  set: setThemePreference
})
// Keep the browser's own colors (canvas, scrollbars) in step, as index.html
// does before Vue starts
watchEffect(() => {
  document.documentElement.style.colorScheme = themeNameRef.value
})

export function initRouter(_router, _route) {
  route = _route
  router = _router
  localeNameRef = useMemo({
    get() {
      return route.path.startsWith('/zh-CN') ? 'zh-CN' : 'en-US'
    },
    set(locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    }
  })
  dateLocaleRef = useMemo(() => {
    return route.path.startsWith('/zh-CN') ? dateZhCN : dateEnUS
  })
}

// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug')
const displayModeRef = computed({
  get() {
    return _displayModeRef.value
  },
  set(value) {
    _displayModeRef.value = value
    window.localStorage.setItem('mode', value)
  }
})

const localeRef = computed(() => {
  return localeNameRef.value === 'zh-CN' ? zhCN : enUS
})

const themeRef = computed(() => {
  const { value } = themeNameRef
  return value === 'dark' ? darkTheme : null
})

// config provider
// eslint-disable-next-line node/prefer-global/process
const configProviderNameRef = ref(process.env.TUSIMPLE ? 'tusimple' : 'default')

const configProviderRef = computed(() => {
  return configProviderNameRef.value === 'tusimple'
    ? TsConfigProvider
    : NConfigProvider
})

// options
const docOptionsRef = computed(() =>
  createDocumentationMenuOptions({
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    lang: localeNameRef.value,
    mode: displayModeRef.value
  })
)
const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = []
  const traverse = (items) => {
    if (!items)
      return
    items.forEach((item) => {
      if (item.children)
        traverse(item.children)
      else flattenedItems.push(item)
    })
  }
  traverse(docOptionsRef.value)
  traverse(componentOptionsRef.value)
  return flattenedItems
})

export function siteSetup() {
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

function changeLangInPath(path, lang) {
  const langReg = /^\/(zh-CN|en-US)\//
  return path.replace(langReg, `/${lang}/`)
}

export function push(partialPath) {
  const { fullPath } = route
  router.push(fullPath.replace(/(^\/[^/]+)((\/.*)|$)/, `$1${partialPath}`))
}

export function useDisplayMode() {
  return displayModeRef
}

export function useLocaleName() {
  return localeNameRef
}

export function useThemeName() {
  return themeNameRef
}

export function useThemePreference() {
  return themePreferenceModelRef
}

export function useDocOptions() {
  return docOptionsRef
}

export function useComponentOptions() {
  return componentOptionsRef
}

export function useFlattenedDocOptions() {
  return flattenedDocOptionsRef
}

export function useConfigProviderName() {
  return configProviderNameRef
}
