import { computed, ref, provide, reactive, toRef, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  darkTheme,
  enUS,
  zhCN,
  dateEnUS,
  dateZhCN,
  useOsTheme
} from '../../src'
import { i18n } from '../utils/composables'
import menuOptions from './menu-options'
import hljs from './hljs'

const storeKey = 'site-store'

export function siteSetup () {
  const route = useRoute()
  const router = useRouter()
  // display mode
  const _displayModeRef = ref(localStorage.getItem('mode') ?? 'debug')
  const displayModeRef = computed({
    get () {
      return _displayModeRef.value
    },
    set (value) {
      _displayModeRef.value = value
      localStorage.setItem('mode', value)
    }
  })
  // locale
  const localeNameRef = computed({
    get () {
      return route.params.lang === 'zh-CN' ? 'zh-CN' : 'en-US'
    },
    set (locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    }
  })
  const localeRef = computed(() => {
    return localeNameRef.value === 'zh-CN' ? zhCN : enUS
  })
  const dateLocaleRef = computed(() => {
    return route.params.lang === 'zh-CN' ? dateZhCN : dateEnUS
  })
  // theme
  const osThemeRef = useOsTheme()
  const themeNameRef = computed({
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
  const themeRef = computed(() => {
    const { value } = themeNameRef
    return value === 'dark' ? darkTheme : undefined
  })
  // options
  const docOptionsRef = computed(() =>
    menuOptions({
      theme: themeNameRef.value,
      lang: localeNameRef.value,
      mode: displayModeRef.value
    })
  )
  const flattenedDocOptionsRef = computed(() => {
    const flattenedItems = []
    const traverse = (items) => {
      if (items) {
        items.forEach((item) => {
          if (item.childItems) traverse(item.childItems)
          else flattenedItems.push(item)
        })
      }
    }
    traverse(docOptionsRef.value)
    return flattenedItems
  })
  provide(
    storeKey,
    reactive({
      themeName: themeNameRef,
      localeName: localeNameRef,
      displayMode: displayModeRef,
      docOptions: docOptionsRef,
      flattenedDocOptions: flattenedDocOptionsRef
    })
  )
  i18n.provide(computed(() => localeNameRef.value))
  return {
    hljs,
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

export function useDisplayMode () {
  return toRef(inject(storeKey), 'displayMode')
}

export function useLocaleName () {
  return toRef(inject(storeKey), 'localeName')
}

export function useThemeName () {
  return toRef(inject(storeKey), 'themeName')
}

export function useDocOptions () {
  return toRef(inject(storeKey), 'docOptions')
}

export function useFlattenedDocOptions () {
  return toRef(inject(storeKey), 'flattenedDocOptions')
}
