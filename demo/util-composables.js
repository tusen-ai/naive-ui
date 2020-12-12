import { toRef, inject } from 'vue'

export function useSiteDisplayMode () {
  return toRef(inject('SiteProvider'), 'displayMode')
}

export function useSiteTheme () {
  return toRef(inject('SiteProvider'), 'theme')
}

export function useSiteLang () {
  return toRef(inject('SiteProvider'), 'lang')
}

export const i18n = function (data) {
  const configProvider = inject('NConfigProvider', null)
  return {
    locale: toRef(configProvider, 'inheritedLanguage'),
    t (key) {
      const { inheritedLanguage } = configProvider
      return data[inheritedLanguage][key]
    }
  }
}
