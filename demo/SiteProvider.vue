<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    :theme="theme"
    :unstable-theme="theme === 'dark' ? darkTheme : undefined"
    :unstable-theme-overrides="overrides"
    :language="lang"
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
import { ref, computed } from 'vue'
import Site from './Site.vue'
import { useRoute, useRouter } from 'vue-router'
import { darkTheme } from '../src'

export default {
  name: 'SiteProvider',
  components: {
    Site
  },
  provide () {
    return {
      SiteProvider: this
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  setup () {
    const displayModeRef = ref(localStorage.getItem('mode') ?? 'debug')
    const displayModeComputed = computed({
      get () {
        return displayModeRef.value
      },
      set (value) {
        displayModeRef.value = value
        localStorage.setItem('mode', value)
      }
    })
    const route = useRoute()
    const router = useRouter()
    const langRef = computed({
      get () {
        return route.params.lang || 'en-US'
      },
      set (lang) {
        router.push(changeLangInPath(route.fullPath, lang))
      }
    })
    const themeRef = computed({
      get () {
        switch (route.params.theme) {
          case 'os-theme':
            return 'light'
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
    return {
      displayMode: displayModeComputed,
      theme: themeRef,
      lang: langRef,
      // unstable
      darkTheme,
      overrides: {
        // common: {
        //   primaryColor: 'rgb(255, 0, 0)'
        // }
      }
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
