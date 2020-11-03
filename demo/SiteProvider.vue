<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    :theme="theme"
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
import Site from './Site.vue'

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
  computed: {
    lang: {
      get () {
        return this.$route.params.lang || 'en-US'
      },
      set (lang) {
        this.$router.push(changeLangInPath(this.$route.fullPath, lang))
      }
    },
    theme: {
      get () {
        switch (this.$route.params.theme) {
          case 'os-theme': return 'light'
          case 'dark': return 'dark'
          default: return 'light'
        }
      },
      set (theme) {
        this.$router.push(
          changeThemeInPath(this.$route.fullPath, theme)
        )
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
