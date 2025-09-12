import type { NLocale } from '../locales/common/enUS'
import type { NDateLocale } from '../locales/date/enUS'
import { computed, inject, type Ref } from 'vue'
import { configProviderInjectionKey } from '../config-provider/src/context'
import { dateEnUS, enUS } from '../locales'

export default function useLocale<T extends keyof NLocale>(
  ns: T
): {
    localeRef: Ref<NLocale[T]>
    dateLocaleRef: Ref<NDateLocale>
  } {
  const { mergedLocaleRef, mergedDateLocaleRef }
    = inject(configProviderInjectionKey, null) || {}
  const localeRef = computed(() => {
    return mergedLocaleRef?.value?.[ns] ?? enUS[ns]
  })
  const dateLocaleRef = computed(() => {
    return mergedDateLocaleRef?.value ?? dateEnUS
  })
  return {
    dateLocaleRef,
    localeRef
  }
}
