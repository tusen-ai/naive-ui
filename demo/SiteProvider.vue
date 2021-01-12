<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    :unstable-theme="theme"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <n-loading-bar-provider ref="loadingBar">
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <site />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { ref, computed, provide, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOsTheme } from 'vooks'
import { darkTheme, enUS, zhCN, dateEnUS, dateZhCN } from '../src'
import { i18n } from './util-composables'
import Site from './Site.vue'

export default {
  name: 'SiteProvider',
  components: {
    Site
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  setup () {
    // provide
    provide('SiteProvider', getCurrentInstance().proxy)
    // route
    const route = useRoute()
    const router = useRouter()
    // display mode: if is debug
    const _displayModeRef = ref(localStorage.getItem('mode') ?? 'debug')
    const displayModeRef = computed({
      get () {
        return _displayModeRef.value
      },
      set (value) {
        _displayModeRef.value = value
        localStorage.setItem('mode', value)
      }
    })
    // locale
    const localeNameRef = computed({
      get () {
        return route.params.lang === 'zh-CN' ? 'zh-CN' : 'en-US'
      },
      set (locale) {
        router.push(changeLangInPath(route.fullPath, locale))
      }
    })
    const localeRef = computed(() => {
      return localeNameRef.value === 'zh-CN' ? zhCN : enUS
    })
    const dateLocaleRef = computed(() => {
      return route.params.lang === 'zh-CN' ? dateZhCN : dateEnUS
    })
    i18n.provide(computed(() => localeRef.value.name))
    // theme
    const osThemeRef = useOsTheme()
    const themeNameRef = computed({
      get () {
        switch (route.params.theme) {
          case 'os-theme':
            return osThemeRef.value
          case 'dark':
            return 'dark'
          default:
            return 'light'
        }
      },
      set (theme) {
        router.push(changeThemeInPath(route.fullPath, theme))
      }
    })
    const themeRef = computed(() => {
      const { value } = themeNameRef
      return value === 'dark' ? darkTheme : undefined
    })
    return {
      displayMode: displayModeRef,
      themeName: themeNameRef,
      theme: themeRef,
      localeName: localeNameRef,
      locale: localeRef,
      dateLocale: dateLocaleRef
    }
  }
}

function changeLangInPath (path, lang) {
  const langReg = /^\/(zh-CN|en-US)\//
  return path.replace(langReg, `/${lang}/`)
}

function changeThemeInPath (path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, '$1' + theme)
}
</script>
