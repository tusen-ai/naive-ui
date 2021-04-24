import { inject, computed, Ref } from 'vue'
import { enUS, dateEnUS } from '../locales'
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider'

export default function createLocaleMixin<T extends keyof typeof enUS> (
  ns: T
): {
    localeRef: Ref<typeof enUS[T]>
    dateLocaleRef: Ref<typeof dateEnUS>
  } {
  const NConfigProvider = inject(configProviderInjectionKey, null)
  const localeRef = computed(() => {
    const { mergedLocaleRef } = NConfigProvider || {}
    return mergedLocaleRef?.value?.[ns] ?? enUS[ns]
  })
  const dateLocaleRef = computed(() => {
    const { mergedDateLocaleRef } = NConfigProvider || {}
    return mergedDateLocaleRef?.value ?? dateEnUS
  })
  return {
    dateLocaleRef,
    localeRef
  }
}
