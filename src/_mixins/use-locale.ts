import { inject, computed, Ref } from 'vue'
import { enUS, dateEnUS } from '../locales'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'

export default function createLocaleMixin<T extends keyof typeof enUS> (
  ns: T
): {
    locale: Ref<typeof enUS[T]>
    dateLocale: Ref<typeof dateEnUS>
  } {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  const localeRef = computed(() => {
    const { mergedLocale } = NConfigProvider || {}
    if (mergedLocale) return mergedLocale[ns]
    return enUS[ns]
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
