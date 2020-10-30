<template>
  <n-layout-header
    bordered
    :style="{
      position: 'relative',
      zIndex: zIndex
    }"
  >
    <div class="nav">
      <n-config-consumer v-slot="{ styleScheme }" abstract>
        <div
          class="ui-logo"
          :style="{
            color: styleScheme.primaryTextColor,
            transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
          }"
          @click="handleLogoClick"
        >
          <img src="./assets/images/naivelogo.svg">
          Naive UI ({{ version }})
        </div>
      </n-config-consumer>
      <div style=" margin-left: 56px; display: flex; align-items: center;">
        <n-auto-complete
          v-model:value="searchInputValue"
          style="width: 216px;"
          :z-index="zIndex && zIndex + 1"
          :placeholder="t('searchPlaceholder')"
          :options="searchOptions"
          clear-after-select
          blur-after-select
          @select="handleSelect"
        />
        <div class="nav-menu">
          <n-menu
            mode="horizontal"
            :value="menuValue"
            :items="menuItems"
            @select="handleMenuSelect"
          />
        </div>
      </div>
      <div style="display: flex;">
        <n-tag class="nav-picker" @click="handleThemeChange">
          {{ themeOptions[theme].label }}
        </n-tag>
        <n-tag class="nav-picker" @click="handleLanguageChange">
          {{ langOptions[lang].label }}
        </n-tag>
        <n-tag
          v-if="dev"
          class="nav-picker"
          @click="handleModeChange"
        >
          {{ modeOptions[displayMode].label }}
        </n-tag>
      </div>
    </div>
  </n-layout-header>
</template>

<script>
import { computed, readonly, ref } from 'vue'
import version from '../src/version'
import { useSiteTheme, useSiteLang, displayModeRef, i18n } from './util-composables'

function match (pattern, string) {
  if (!pattern.length) return true
  if (!string.length) return false
  if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

export default {
  name: 'SiteHeader',
  inject: ['message'],
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const { t } = i18n({
      'zh-CN': {
        'dark': '深色',
        'light': '浅色',
        'searchPlaceholder': '搜索',
        'home': '首页',
        'doc': '文档',
        'common': '常规',
        'debug': '调试',
        'alreadyHome': '别点了，你已经在首页了'
      },
      'en-US': {
        'dark': 'Dark',
        'light': 'Light',
        'searchPlaceholder': 'Search',
        'home': 'Home',
        'doc': 'Documentation',
        'common': 'Common',
        'debug': 'Debug',
        'alreadyHome': "You've already been in home page. No clicking."
      }
    })
    const menuItemsRef = computed(() => {
      return [
        {
          name: 'home',
          title: t('home')
        },
        {
          name: 'doc',
          title: t('doc')
        }
      ]
    })
    const themeOptionsRef = computed(() => ({
      dark: {
        label: t('light'),
        next: 'light'
      },
      light: {
        label: t('dark'),
        next: 'dark'
      }
    }))
    return {
      t,
      searchInputValue: ref(''),
      version,
      dev: __DEV__,
      displayMode: displayModeRef,
      lang: useSiteLang(),
      theme: useSiteTheme(),
      menuItems: menuItemsRef,
      themeOptions: themeOptionsRef,
      langOptions: readonly({
        'zh-CN': {
          label: 'English',
          next: 'en-US'
        },
        'en-US': {
          label: '中文',
          next: 'zh-CN'
        }
      }),
      modeOptions: readonly({
        debug: {
          label: 'Production',
          next: 'common'
        },
        common: {
          label: 'Debug',
          next: 'debug'
        }
      })
    }
  },
  computed: {
    zIndex () {
      const path = this.$route.path
      return (path.endsWith('n-modal') || path.endsWith('n-drawer') || path.endsWith('n-dialog')) ? null : 3000
    },
    menuValue () {
      if (/^(\/[^/]+){2}\/doc/.test(this.$route.path)) return 'doc'
      else if (this.$route.name === 'home') return 'home'
      return null
    },
    searchOptions () {
      function getLabel (item) {
        if (item.title) return item.title + (item.titleExtra ? (' ' + item.titleExtra) : '')
        return item.name
      }
      if (!this.searchInputValue) return []
      const replaceRegex = / |-/g
      return this.items.filter(item => {
        const pattern = this.searchInputValue.toLowerCase().replace(replaceRegex, '').slice(0, 20)
        const label = getLabel(item).toLowerCase().replace(replaceRegex, '')
        return match(pattern, label)
      }).map(item => ({
        label: getLabel(item),
        value: item.path
      }))
    }
  },
  methods: {
    handleLogoClick () {
      if (/^(\/[^/]+){2}$/.test(this.$route.path)) {
        this.message.info(this.t('alreadyHome'))
        return
      }
      this.$router.push(
        /^(\/[^/]+){2}/.exec(this.$route.path)[0]
      )
    },
    handleSelect (value) {
      this.$router.push(value)
    },
    handleMenuSelect (value) {
      if (value === 'home') {
        this.$router.push(
          /^(\/[^/]+){2}/.exec(this.$route.path)[0]
        )
      } if (value === 'doc') {
        if (/^(\/[^/]+){2}\/doc/.test(this.$route.path)) {

        } else {
          this.$router.push(
            /^(\/[^/]+){2}/.exec(this.$route.path)[0] + '/doc/start'
          )
        }
      }
    },
    handleThemeChange () {
      this.theme = this.themeOptions[this.theme].next
    },
    handleModeChange () {
      this.displayMode = this.modeOptions[this.displayMode].next
    },
    handleLanguageChange () {
      this.lang = this.langOptions[this.lang].next
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: grid;
  grid-template-columns: 288px 1fr auto 32px;
  grid-template-rows: 63px;
  align-items: center;
}
.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 36px;
  font-size: 18px;
}
.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}
.nav-menu {
  padding-left: 32px;
}

.nav-menu ::v-deep(.n-menu-item) {
  height: 63px !important;
}

.nav-picker {
  cursor: pointer;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
