<template>
  <n-config-provider class="demo" namespace="naive-ui-doc" :theme="theme" :language="lang">
    <n-layout position="absolute" class="root-layout">
      <doc-header
        :lang="lang"
        :items="flattenedItems"
        :env="env"
        :mode="mode"
        @lang-change="handleLangChange"
        @mode-change="handleModeChange"
      />
      <n-layout class="home-layout" style="top: 64px; overflow: hidden;" position="absolute">
        <router-view />
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script>
import DocHeader from './header.vue'
import menuOptions from './menuOptions'
import { i18n } from './deploymentInit'
import { state, setState } from './store'

export default {
  components: {
    DocHeader
  },
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
    this.$i18n.locale = to.params.lang
    next()
  },
  data () {
    return {
      state: state
    }
  },
  computed: {
    mode () {
      return state.mode
    },
    env () {
      return process.env.NODE_ENV
    },
    items () {
      return menuOptions(this.lang, this)
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
        return this.$route.params.theme === 'light' ? 'light' : 'dark'
      },
      set (theme) {
        this.$router.push(changeThemeInPath(this.$route.fullPath, theme))
      }
    }
  },
  methods: {
    handleLangChange (lang) {
      this.lang = lang
    },
    handleModeChange (mode) {
      setState(mode)
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
  background-color: white;
}
.home-layout.n-layout.n-light-theme {
  background-color: white;
}
</style>
