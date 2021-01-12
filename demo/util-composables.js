import { toRef, inject, provide, reactive, watchEffect, computed } from 'vue'
import menuOptions from './menu-options'

export function useSiteOptions () {
  const themeRef = useSiteThemeName()
  const langRef = useSiteLocaleName()
  const displayModeRef = useSiteDisplayMode()
  return computed(() =>
    menuOptions({
      theme: themeRef.value,
      lang: langRef.value,
      mode: displayModeRef.value
    })
  )
}

export function useSiteFlattenedOptions () {
  const themeRef = useSiteThemeName()
  const langRef = useSiteLocaleName()
  const displayModeRef = useSiteDisplayMode()
  return computed(() => {
    const flattenedItems = []
    const traverse = (items) => {
      if (items) {
        items.forEach((item) => {
          if (item.childItems) traverse(item.childItems)
          else flattenedItems.push(item)
        })
      }
    }
    traverse(
      menuOptions({
        theme: themeRef.value,
        lang: langRef.value,
        mode: displayModeRef.value
      })
    )
    return flattenedItems
  })
}

export function useSiteDisplayMode () {
  return toRef(inject('SiteProvider'), 'displayMode')
}

export function useSiteThemeName () {
  return toRef(inject('SiteProvider'), 'themeName')
}

export function useSiteLocaleName () {
  return toRef(inject('SiteProvider'), 'localeName')
}

export const i18n = function (data) {
  const localeReactive = inject('i18n', null)
  return {
    locale: toRef(localeReactive, 'locale'),
    t (key) {
      const { locale } = localeReactive
      return data[locale][key]
    }
  }
}

i18n.provide = function (localeRef) {
  const localeReactive = reactive({})
  watchEffect(() => {
    localeReactive.locale = localeRef.value
  })
  provide('i18n', localeReactive)
}
