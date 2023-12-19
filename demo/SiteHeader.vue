<template>
  <n-layout-header bordered class="nav" :style="style">
    <n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
      <img src="./assets/images/naivelogo.svg">
      <span v-if="!isMobile">Naive UI</span>
    </n-text>
    <div
      :style="
        !isMobile ? 'display: flex; align-items: center; overflow: hidden;' : ''
      "
    >
      <div v-if="!(isMobile || isTablet)" class="nav-menu">
        <n-menu
          ref="menuInstRef"
          responsive
          mode="horizontal"
          :value="menuValue"
          :options="menuOptions"
          :render-label="renderMenuLabel"
        />
      </div>
      <n-auto-complete
        v-model:value="searchPattern"
        :style="
          !isMobile
            ? 'width: 216px; margin-left: 24px; margin-right: 12px; flex-shrink: 0;'
            : undefined
        "
        :placeholder="t('searchPlaceholder')"
        :options="searchOptions"
        clear-after-select
        blur-after-select
        @select="handleSearch"
      />
      <!-- TODO: add it -->
      <!-- template #suffix>
        <span style="color: var(--placeholder-color)">⌘ + K</span>
      </template -->
    </div>
    <n-popover
      v-if="isMobile || isTablet"
      ref="mobilePopoverRef"
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px">
          <menu-outline />
        </n-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh">
        <n-menu
          :value="mobileMenuValue"
          :options="mobileMenuOptions"
          :indent="18"
          :render-label="renderMenuLabel"
          @update:value="handleUpdateMobileMenu"
        />
      </div>
    </n-popover>
    <div v-else class="nav-end">
      <n-button
        size="small"
        quaternary
        class="nav-picker"
        @click="handleLocaleUpdate"
      >
        {{ localeLabelMap[locale] }}
      </n-button>
      <n-button
        size="small"
        quaternary
        class="nav-picker"
        @click="handleThemeUpdate"
      >
        {{ themeLabelMap[theme] }}
      </n-button>
      <n-button
        size="small"
        tag="a"
        quaternary
        class="nav-picker"
        :href="repoUrl"
        target="_blank"
      >
        GitHub
      </n-button>
      <n-text class="nav-picker padded">
        {{ version }}
      </n-text>
      <n-button
        v-if="dev"
        size="small"
        quaternary
        class="nav-picker"
        @click="handleDisplayModeUpdate"
      >
        {{ displayModeLabelMap[displayMode] }}
      </n-button>
      <n-button
        v-if="tusimple || dev"
        size="small"
        quaternary
        class="nav-picker"
        @click="handleConfigProviderUpdate"
      >
        {{ cfgProviderLabelMap[configProviderName] }}
      </n-button>
    </div>
  </n-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, version } from 'naive-ui'
import { MenuOutline } from '@vicons/ionicons5'
import { repoUrl } from './utils/github-url'
import { i18n, useIsMobile, useIsTablet } from './utils/composables'
import { findMenuValue } from './utils/route'
import {
  useThemeName,
  useLocaleName,
  useDisplayMode,
  useFlattenedDocOptions,
  useConfigProviderName,
  useDocOptions,
  useComponentOptions
} from './store'
import { renderMenuLabel } from './store/menu-options'

// match substr
function match (pattern, string) {
  if (!pattern.length) return true
  if (!string.length) return false
  if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

const locales = {
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
    tusimpleTheme: 'TuSimple Theme',
    defaultTheme: 'Default Theme'
  }
}

export default defineComponent({
  name: 'SiteHeader',
  components: {
    MenuOutline
  },
  setup () {
    const message = useMessage()
    const route = useRoute()
    const router = useRouter()

    const mobilePopoverRef = ref(null)
    const themeAndLocaleReg = /^(\/[^/]+){2}/

    // i18n
    const { t } = i18n(locales)

    // menu
    const menuOptionsRef = computed(() => {
      return [
        {
          key: 'home',
          label: t('home'),
          path: themeAndLocaleReg.exec(route.path)[0]
        },
        {
          key: 'doc',
          label: t('doc'),
          path: themeAndLocaleReg.exec(route.path)[0] + '/docs/introduction'
        },
        {
          key: 'component',
          label: t('component'),
          path: themeAndLocaleReg.exec(route.path)[0] + '/components/button'
        }
      ]
    })
    const menuValueRef = computed(() => {
      if (/\/docs\//.test(route.path)) return 'doc'
      if (/\/components\//.test(route.path)) return 'component'
      else if (route.name === 'home') return 'home'
      return null
    })

    // mobile options
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const mobileMenuOptionsRef = computed(() => {
      return [
        {
          key: 'theme',
          label: themeLabelMapRef.value[themeNameRef.value]
        },
        {
          key: 'locale',
          label: localeNameRef.value === 'zh-CN' ? 'English' : '中文'
        },
        {
          key: 'home',
          label: t('home'),
          path: themeAndLocaleReg.exec(route.path)[0]
        },
        {
          key: 'doc',
          label: t('doc'),
          children: docOptionsRef.value,
          path: themeAndLocaleReg.exec(route.path)[0] + '/docs/introduction'
        },
        {
          key: 'component',
          label: t('component'),
          path: themeAndLocaleReg.exec(route.path)[0] + '/components/button',
          children: componentOptionsRef.value
        },
        {
          key: 'github',
          label: 'GitHub'
        }
      ]
    })
    const mobileMenuValueRef = computed(() => {
      if (route.name === 'home') return 'home'
      return findMenuValue(mobileMenuOptionsRef.value, route.path)
    })
    function handleUpdateMobileMenu (value, { path }) {
      if (value === 'theme') {
        handleThemeUpdate()
      } else if (value === 'locale') {
        if (localeNameRef.value === 'zh-CN') {
          localeNameRef.value = 'en-US'
        } else {
          localeNameRef.value = 'zh-CN'
        }
      } else if (path) {
        router.push(path)
      } else {
        window.open(repoUrl, '_blank')
      }
      mobilePopoverRef.value.setShow(false)
    }

    // theme
    const themeNameRef = useThemeName()
    const themeLabelMapRef = computed(() => ({
      dark: t('light'),
      light: t('dark')
    }))
    function handleThemeUpdate () {
      if (themeNameRef.value === 'dark') {
        themeNameRef.value = 'light'
      } else {
        themeNameRef.value = 'dark'
      }
    }

    // locale
    const localeNameRef = useLocaleName()
    const localeLabelMap = {
      'zh-CN': 'English',
      'en-US': '中文'
    }
    function handleLocaleUpdate () {
      if (localeNameRef.value === 'zh-CN') {
        localeNameRef.value = 'en-US'
      } else {
        localeNameRef.value = 'zh-CN'
      }
    }

    // display mode
    const displayModeRef = useDisplayMode()
    const displayModeLabelMap = {
      common: 'Debug',
      debug: 'Prod'
    }
    function handleDisplayModeUpdate () {
      if (displayModeRef.value === 'common') {
        displayModeRef.value = 'debug'
      } else {
        displayModeRef.value = 'common'
      }
    }

    // config provider
    const configProviderNameRef = useConfigProviderName()
    const cfgProviderLabelMapRef = computed(() => ({
      tusimple: t('defaultTheme'),
      default: t('tusimpleTheme')
    }))
    function handleConfigProviderUpdate () {
      if (configProviderNameRef.value === 'tusimple') {
        configProviderNameRef.value = 'default'
      } else {
        configProviderNameRef.value = 'tusimple'
      }
    }

    // search
    const searchableOptionsRef = useFlattenedDocOptions()
    const searchPatternRef = ref('')
    const searchOptionsRef = computed(() => {
      function getLabel (item) {
        if (item.label) {
          return item.label + (item.extra ? ' ' + item.extra : '')
        }
        return item.key
      }
      if (!searchPatternRef.value) return []
      const replaceRegex = / |-/g
      return searchableOptionsRef.value
        .filter((item) => {
          const pattern = searchPatternRef.value
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
    })
    function handleSearch (value) {
      router.push(value)
    }

    // common
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()
    function handleLogoClick () {
      if (/^(\/[^/]+){2}$/.test(route.path)) {
        message.info(t('alreadyHome'))
        return
      }
      router.push(/^(\/[^/]+){2}/.exec(route.path)[0])
    }

    // responsive menu
    const menuInstRef = ref()
    let lastWindowInnerWidth = window.innerWidth
    window.addEventListener('resize', () => {
      if (window.innerWidth > lastWindowInnerWidth) {
        menuInstRef.value?.deriveResponsiveState()
      }
      lastWindowInnerWidth = window.innerWidth
    })

    return {
      menuInstRef,
      renderMenuLabel,
      mobilePopoverRef,
      tusimple: process.env.TUSIMPLE,
      dev: __DEV__,
      message,
      t,
      version,
      isMobile: isMobileRef,
      isTablet: isTabletRef,
      repoUrl,
      // theme
      theme: themeNameRef,
      handleThemeUpdate,
      themeLabelMap: themeLabelMapRef,
      // displayMode
      displayMode: displayModeRef,
      displayModeLabelMap,
      handleDisplayModeUpdate,
      // locale
      locale: localeNameRef,
      localeLabelMap,
      handleLocaleUpdate,
      // configProvider
      configProviderName: configProviderNameRef,
      cfgProviderLabelMap: cfgProviderLabelMapRef,
      handleConfigProviderUpdate,
      // search
      searchPattern: searchPatternRef,
      searchOptions: searchOptionsRef,
      handleSearch,
      // menu
      menuOptions: menuOptionsRef,
      menuValue: menuValueRef,
      // mobile & tablet menu
      mobileMenuOptions: mobileMenuOptionsRef,
      handleUpdateMobileMenu,
      mobileMenuValue: mobileMenuValueRef,
      // common
      handleLogoClick,
      style: computed(() => {
        return isMobileRef.value
          ? {
              '--side-padding': '16px',
              'grid-template-columns': 'auto 1fr auto'
            }
          : {
              '--side-padding': '32px',
              'grid-template-columns':
                'calc(272px - var(--side-padding)) 1fr auto'
            }
      })
    }
  }
})
</script>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}

.nav-menu {
  padding-left: 36px;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 1;
}

.nav-picker {
  margin-right: 4px;
}

.nav-picker.padded {
  padding: 0 10px;
}

.nav-picker:last-child {
  margin-right: 0;
}

.nav-end {
  display: flex;
  align-items: center;
}
</style>

<style>
.nav-menu .n-menu-item,
.nav-menu .n-submenu,
.nav-menu .n-menu-item-content {
  height: calc(var(--header-height) - 1px) !important;
}
</style>
