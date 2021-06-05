import { toRef, inject, provide, reactive, watchEffect } from 'vue'
import { useBreakpoint, useMemo } from 'vooks'

export function useIsMobile () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'xs'
  })
}

export function useIsTablet () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 's'
  })
}

export function useIsSmallDesktop () {
  const breakpointRef = useBreakpoint()
  return useMemo(() => {
    return breakpointRef.value === 'm'
  })
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
