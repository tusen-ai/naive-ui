import { toRef, inject, provide, reactive, watchEffect } from 'vue'

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
