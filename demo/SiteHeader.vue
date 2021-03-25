<template>
  <n-layout-header bordered>
    <div class="nav">
      <n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
        <img src="./assets/images/naivelogo.svg" />
        Naive UI
      </n-text>
      <div style="display: flex; align-items: center">
        <div class="nav-menu">
          <n-menu
            mode="horizontal"
            :value="menuValue"
            :items="menuItems"
            @update:value="handleMenuSelect"
          />
        </div>
        <n-auto-complete
          v-model:value="searchInputValue"
          style="width: 216px; margin-left: 24px"
          :placeholder="t('searchPlaceholder')"
          :options="searchOptions"
          clear-after-select
          blur-after-select
          @select="handleSelect"
        />
      </div>
      <div style="display: flex">
        <n-button size="small" class="nav-picker" @click="handleThemeChange">
          {{ themeOptions[theme].label }}
        </n-button>
        <n-popselect
          :options="langOptions"
          v-model:value="lang"
          overlap
          placement="top"
          trigger="click"
        >
          <n-button size="small" class="nav-picker">
            {{ langOptionLabels[lang] }}
          </n-button>
        </n-popselect>
        <n-popselect
          v-if="tusimple || dev"
          :options="configProviderOptions"
          v-model:value="configProviderName"
          overlap
          placement="top"
          trigger="click"
        >
          <n-button size="small" class="nav-picker">
            {{ configProviderLabels[configProviderName] }}
          </n-button>
        </n-popselect>
        <n-popselect
          v-if="dev"
          :options="modeOptions"
          v-model:value="displayMode"
          overlap
          placement="top"
          trigger="click"
        >
          <n-button size="small" class="nav-picker">{{
            modeOptionLabels[displayMode]
          }}</n-button>
        </n-popselect>
        <n-button size="small">
          {{ version }}
        </n-button>
      </div>
    </div>
  </n-layout-header>
</template>

<script>
import { computed, ref } from 'vue'
import version from '../src/version'
import { useMessage } from '../src'
import { i18n } from './utils/composables'
import {
  useThemeName,
  useLocaleName,
  useDisplayMode,
  useFlattenedDocOptions,
  useConfigProviderName
} from './store'

function match (pattern, string) {
  if (!pattern.length) return true
  if (!string.length) return false
  if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

export default {
  name: 'SiteHeader',
  setup () {
    const message = useMessage()
    const { t } = i18n({
      'zh-CN': {
        dark: '深色',
        light: '浅色',
        searchPlaceholder: '搜索',
        home: '首页',
        doc: '文档',
        component: '组件',
        common: '常规',
        debug: '调试',
        alreadyHome: '别点了，你已经在首页了',
        tusimpleTheme: '图森主题',
        defaultTheme: '默认主题'
      },
      'en-US': {
        dark: 'Dark',
        light: 'Light',
        searchPlaceholder: 'Search',
        home: 'Home',
        doc: 'Docs',
        component: 'Components',
        common: 'Common',
        debug: 'Debug',
        alreadyHome: 'You are already in home page. No clicking anymore.',
        tusimpleTheme: 'Tusimple Theme',
        defaultTheme: 'Default Theme'
      }
    })
    const menuItemsRef = computed(() => {
      return [
        {
          key: 'home',
          title: t('home')
        },
        {
          key: 'doc',
          title: t('doc')
        },
        {
          key: 'component',
          title: t('component')
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
    const configProviderLabelsRef = computed(() => ({
      tusimple: t('tusimpleTheme'),
      default: t('defaultTheme')
    }))
    const configProviderOptionsRef = computed(() => [
      {
        label: t('defaultTheme'),
        value: 'default'
      },
      {
        label: t('tusimpleTheme'),
        value: 'tusimple'
      }
    ])
    return {
      t,
      message,
      searchInputValue: ref(''),
      version,
      dev: __DEV__,
      tusimple: process.env.TUSIMPLE,
      displayMode: useDisplayMode(),
      lang: useLocaleName(),
      theme: useThemeName(),
      items: useFlattenedDocOptions(),
      configProviderName: useConfigProviderName(),
      menuItems: menuItemsRef,
      themeOptions: themeOptionsRef,
      langOptionLabels: {
        'zh-CN': '中文',
        'en-US': 'English'
      },
      langOptions: [
        {
          label: 'English',
          value: 'en-US'
        },
        {
          label: '中文',
          value: 'zh-CN'
        }
      ],
      modeOptionLabels: {
        common: 'Prod',
        debug: 'Debug'
      },
      modeOptions: [
        {
          label: 'Prod',
          value: 'common'
        },
        {
          label: 'Debug',
          value: 'debug'
        }
      ],
      configProviderOptions: configProviderOptionsRef,
      configProviderLabels: configProviderLabelsRef
    }
  },
  computed: {
    menuValue () {
      if (/\/docs\//.test(this.$route.path)) return 'doc'
      if (/\/components\//.test(this.$route.path)) return 'component'
      else if (this.$route.name === 'home') return 'home'
      return null
    },
    searchOptions () {
      function getLabel (item) {
        if (item.label) {
          return item.label + (item.extra ? ' ' + item.extra : '')
        }
        return item.key
      }
      if (!this.searchInputValue) return []
      const replaceRegex = / |-/g
      return this.items
        .filter((item) => {
          const pattern = this.searchInputValue
            .toLowerCase()
            .replace(replaceRegex, '')
            .slice(0, 20)
          const label = getLabel(item).toLowerCase().replace(replaceRegex, '')
          return match(pattern, label)
        })
        .map((item) => ({
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
      this.$router.push(/^(\/[^/]+){2}/.exec(this.$route.path)[0])
    },
    handleSelect (value) {
      this.$router.push(value)
    },
    handleMenuSelect (value) {
      if (value === 'home') {
        this.$router.push(/^(\/[^/]+){2}/.exec(this.$route.path)[0])
      }
      if (value === 'doc') {
        if (!/^(\/[^/]+){2}\/docs/.test(this.$route.path)) {
          this.$router.push(
            /^(\/[^/]+){2}/.exec(this.$route.path)[0] + '/docs/installation'
          )
        }
      }
      if (value === 'component') {
        if (!/^(\/[^/]+){2}\/components/.test(this.$route.path)) {
          this.$router.push(
            /^(\/[^/]+){2}/.exec(this.$route.path)[0] + '/components/n-button'
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
    },
    handleConfigProviderChange () {
      this.configProviderName = this.configProviderOptions[
        this.configProviderName
      ].next
    }
  }
}
</script>

<style scoped>
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
  padding-left: 36px;
}

.nav-picker {
  margin-right: 12px;
}

.nav-picker:last-child {
  margin-right: 0;
}
</style>

<style>
.nav-menu .n-menu-item {
  height: 63px !important;
}
</style>
