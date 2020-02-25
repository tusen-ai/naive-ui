<template>
  <n-config-provider class="demo" namespace="naive-ui-doc" :theme="theme" :language="lang">
    <n-nimbus-service-layout
      ref="layout"
      :padding-body="false"
      :items="items"
      :header-z-index="3000"
    >
      <template v-slot:nav>
        <doc-header
          :lang="lang"
          :items="flattenedItems"
          @lang-change="handleLangChange"
        />
      </template>
      <router-view />
    </n-nimbus-service-layout>
  </n-config-provider>
</template>

<script>
import DocHeader from './header.vue'
import menuOptions from './menuOptions'
import { i18n } from './init'

export default {
  components: {
    DocHeader
  },
  provide () {
    return {
      NDocRoot: this
    }
  },
  beforeRouteEnter (to, from, next) {
    i18n.locale = to.params.lang
    next()
  },
  beforeRouteUpdate (to, from, next) {
    this.$i18n.locale = to.params.lang
    this.memorizedPath = from ? from.path : null
    next()
  },
  data () {
    return {
      memorizedPath: null
    }
  },
  computed: {
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
    resetScrollPosition () {
      this.$refs.layout.resetScrollPosition()
    },
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

.n-doc {
  width: 720px;
  margin: 0 auto;
  .n-doc-header {
    display: flex;
    // height: 60px;
    // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 16px;
    // align-items: center;
  }
  .n-doc-section {
    .n-doc-section__header {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    .n-doc-section__view {
      background: #5c657eff;
      padding: 18px;
      border-radius: 8px;
      justify-content: center;
      display: flex;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .n-doc-section__inspect {
      background: #5c657eff;
      padding: 18px;
      border-radius: 8px;
      display: flex;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .n-doc-section__text-content {
      font-size: 16px;
    }
    .n-doc-section__source {
      position: relative;
    }
  }
}
</style>
