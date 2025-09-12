import { useBreakpoint, useMemo } from 'vooks'
import { inject, provide, reactive, toRef, watchEffect } from 'vue'

export function useIsMobile() {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'xs'
  })
}

export function useIsTablet() {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 's'
  })
}

export function useIsSmallDesktop() {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'm'
  })
}

export const i18n = function (data: Record<string, Record<string, string>>) {
  const localeReactive = inject<{ locale: string } | null>('i18n', null)
  if (!localeReactive) {
    throw new Error('i18n context not provided')
  }
  return {
    locale: toRef(localeReactive, 'locale'),
    t(key) {
      const { locale } = localeReactive
      return data[locale][key]
    }
  }
}

i18n.provide = function (localeRef) {
  const localeReactive = reactive<{ locale: string }>({ locale: '' })
  watchEffect(() => {
    localeReactive.locale = localeRef.value
  })
  provide('i18n', localeReactive)
}
