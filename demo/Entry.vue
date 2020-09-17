<template>
  <n-config-provider
    class="demo"
    namespace="naive-ui-doc"
    :theme="theme"
    :language="lang"
  >
    <n-message-provider>
      <n-notification-provider>
        <n-layout position="absolute" class="root-layout">
          <doc-header
            :lang="lang"
            :items="flattenedItems"
            :env="env"
            @lang-change="handleLangChange"
          />
          <n-layout class="home-layout" style="top: 64px; overflow: hidden;" position="absolute">
            <router-view />
          </n-layout>
        </n-layout>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import DocHeader from './Header.vue'
import menuOptions from './menu-options'
import { i18n } from './init'
import { modeRef } from './use-dev-mode'
import simulatedComputed from '../src/_mixins/simulatedComputed'

export default {
  components: {
    DocHeader
  },
  mixins: [
    simulatedComputed({
      menuGenerationOptions: {
        get () {
          return {
            theme: this.theme,
            lang: this.lang,
            mode: this.mode
          }
        },
        deps: ['theme', 'lang', 'mode'],
        default: null
      }
    })
  ],
  provide () {
    return {
      NEntry: this
    }
  },
  beforeRouteEnter (to, from, next) {
    i18n.locale = to.params.lang
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // this.$i18n.locale = to.params.lang
    next()
  },
  data () {
    return {
      modeRef
    }
  },
  computed: {
    mode () {
      return this.modeRef.value
    },
    env () {
      return process.env.NODE_ENV
    },
    items () {
      return menuOptions(this.menuGenerationOptions)
    },
    flattenedItems () {
      const flattenedItems = []
      const traverse = items => {
        if (items) {
          items.forEach(item => {
            if (item.childItems) traverse(item.childItems)
            else flattenedItems.push(item)
          })
        }
      }
      traverse(this.items)
      return flattenedItems
    },
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
          case 'os-theme': return this.$NOs.theme
          case 'dark': return 'dark'
          default: return 'light'
        }
      },
      set (theme) {
        this.$router.push(changeThemeInPath(this.$route.fullPath, theme))
      }
    }
  },
  methods: {
    handleLangChange (lang) {
      this.lang = lang
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

<style lang="scss" scoped>
.demo {
  z-index: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1080px;
}
</style>

<style lang="scss">
body {
  -webkit-text-size-adjust: 100%;
}

.root-layout.n-layout.n-light-theme {
  background-color: #FFF;
}
.home-layout.n-layout.n-light-theme {
  background-color: #FFF;
}
</style>
