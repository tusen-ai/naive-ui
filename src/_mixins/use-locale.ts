import { inject, computed, type Ref } from 'vue'
import { enUS, dateEnUS } from '../locales'
import type { NLocale } from '../locales/common/enUS'
import type { NDateLocale } from '../locales/date/enUS'
import { configProviderInjectionKey } from '../config-provider/src/context'

export default function useLocale<T extends keyof NLocale> (
  ns: T
): {
    localeRef: Ref<NLocale[T]>
    dateLocaleRef: Ref<NDateLocale>
  } {
  const { mergedLocaleRef, mergedDateLocaleRef } =
    inject(configProviderInjectionKey, null) || {}
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
