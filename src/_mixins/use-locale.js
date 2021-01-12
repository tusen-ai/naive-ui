import { inject, computed, getCurrentInstance } from 'vue'
import { enUS, dateEnUS } from '../locales'

export default function createLocaleMixin (ns) {
  const vm = getCurrentInstance().proxy
  const NConfigProvider = inject('NConfigProvider', {})
  const localeRef = computed(() => {
    const { mergedLocale } = NConfigProvider
    if (mergedLocale) return mergedLocale[ns]
    const { mergedLanguage } = NConfigProvider
    if (mergedLanguage) {
      // legacy start
      const {
        $naive: { locales = [], fallbackLocale }
      } = vm
      return locales[mergedLanguage ?? fallbackLocale][ns]
    } else {
      return enUS[ns]
    }
  })
  const dateLocaleRef = computed(() => {
    const { mergedDateLocale } = NConfigProvider
    return mergedDateLocale ?? dateEnUS
  })
  return {
    dateLocale: dateLocaleRef,
    locale: localeRef
  }
}
