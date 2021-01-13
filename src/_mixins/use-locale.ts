import { inject, computed, getCurrentInstance } from 'vue'
import { enUS, dateEnUS } from '../locales'
import { ConfigProviderInjection } from '../config-provider'

export default function createLocaleMixin (ns: keyof typeof enUS) {
  const vm = getCurrentInstance()?.proxy
  const NConfigProvider = inject<ConfigProviderInjection | null>('NConfigProvider', null)
  const localeRef = computed(() => {
    const { mergedLocale } = NConfigProvider || {}
    if (mergedLocale) return mergedLocale[ns]
    const { mergedLanguage } = NConfigProvider || {}
    if (mergedLanguage) {
      // legacy start
      const {
        $naive: { locales = [], fallbackLocale }
      } = vm as any
      return locales[mergedLanguage ?? fallbackLocale][ns]
    } else {
      return enUS[ns]
    }
  })
  const dateLocaleRef = computed(() => {
    const { mergedDateLocale } = NConfigProvider || {}
    return mergedDateLocale ?? dateEnUS
  })
  return {
    dateLocale: dateLocaleRef,
    locale: localeRef
  }
}
