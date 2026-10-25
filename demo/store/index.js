import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  enUS,
  NConfigProvider,
  zhCN
} from 'naive-ui'
import { useMemo } from 'vooks'
import { computed, ref } from 'vue'
import { TsConfigProvider } from '../../themes/tusimple/src'
import { useColorMode } from '../utils/color-mode'
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
// localStorage rather than the URL
const { mode: themeModeRef, state: themeStateRef } = useColorMode({
  storageKey: 'naive-ui-theme'
})
// The theme in effect, `light` or `dark`; setting it stores an explicit pick
const themeNameRef = computed({
  get: () => themeStateRef.value,
  set: (theme) => {
    themeModeRef.value = theme
  }
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

export function useThemeMode() {
  return themeModeRef
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
