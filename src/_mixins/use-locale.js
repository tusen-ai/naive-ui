import { inject, computed, getCurrentInstance } from 'vue'

export default function createLocaleMixin (componentLocaleNamespace) {
  const vm = getCurrentInstance().proxy
  const NConfigProvider = inject('NConfigProvider', {})
  const globalLocaleRef = computed(() => {
    const { locale } = NConfigProvider
    if (locale) return locale
    const { mergedLanguage } = NConfigProvider
    const {
      $naive: { locales, fallbackLocale }
    } = vm
    return locales[mergedLanguage ?? fallbackLocale]
  })
  return {
    dateLocale: computed(() => globalLocaleRef.value._dateFns),
    locale: computed(() => globalLocaleRef.value[componentLocaleNamespace])
  }
}
