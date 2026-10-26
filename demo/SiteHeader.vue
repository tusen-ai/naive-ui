<script setup lang="ts">
import type { PopoverInst } from 'naive-ui'
import type { SiteMenuOption } from './store/menu-options'
import type { ColorMode } from './utils/color-mode'
import { MenuOutline } from '@vicons/ionicons5'
import { useMessage, version } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  useComponentOptions,
  useConfigProviderName,
  useDisplayMode,
  useDocOptions,
  useFlattenedDocOptions,
  useLocaleName,
  useThemeMode
} from './store'
import { renderMenuLabel } from './store/menu-options'
import { i18n, useIsMobile, useIsTablet } from './utils/composables'
import { repoUrl } from './utils/github-url'
import { findMenuValue } from './utils/route'

defineOptions({ name: 'SiteHeader' })

// match substr
function match(pattern: string, string: string): boolean {
  if (!pattern.length)
    return true
  if (!string.length)
    return false
  if (pattern[0] === string[0])
    return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

const locales = {
  'zh-CN': {
    dark: '深色',
    light: '浅色',
    osTheme: '跟随系统',
    theme: '主题',
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
    osTheme: 'System',
    theme: 'Theme',
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

const message = useMessage()
const route = useRoute()
const router = useRouter()

const mobilePopoverRef = ref<PopoverInst | null>(null)
const localeReg = /^\/[^/]+/
// The locale part of the path, e.g. `/zh-CN`
function getLocalePath(): string {
  return localeReg.exec(route.path)?.[0] ?? ''
}

// i18n
const { t } = i18n(locales)

// theme
const themePreference = useThemeMode()
const themeOptions = computed(() => [
  { label: t('light'), value: 'light' },
  { label: t('dark'), value: 'dark' },
  { label: t('osTheme'), value: 'auto' }
])
const themePreferenceLabel = computed(
  () =>
    themeOptions.value.find(option => option.value === themePreference.value)
      ?.label
)

// locale
const locale = useLocaleName()

// menu
const menuOptions = computed(() => {
  return [
    {
      key: 'home',
      label: t('home'),
      path: getLocalePath()
    },
    {
      key: 'doc',
      label: t('doc'),
      path: `${getLocalePath()}/docs/introduction`
    },
    {
      key: 'component',
      label: t('component'),
      path: `${getLocalePath()}/components/button`
    }
  ]
})
const menuValue = computed(() => {
  if (/\/docs\//.test(route.path))
    return 'doc'
  if (/\/components\//.test(route.path))
    return 'component'
  else if (route.name === 'home')
    return 'home'
  return null
})

// mobile options
const docOptionsRef = useDocOptions()
const componentOptionsRef = useComponentOptions()
const mobileMenuOptions = computed(() => {
  return [
    {
      key: 'theme',
      label: `${t('theme')}: ${themePreferenceLabel.value}`,
      children: themeOptions.value.map(option => ({
        key: `theme:${option.value}`,
        label: option.label
      }))
    },
    {
      key: 'locale',
      label: locale.value === 'zh-CN' ? 'English' : '中文'
    },
    {
      key: 'home',
      label: t('home'),
      path: getLocalePath()
    },
    {
      key: 'doc',
      label: t('doc'),
      children: docOptionsRef.value,
      path: `${getLocalePath()}/docs/introduction`
    },
    {
      key: 'component',
      label: t('component'),
      path: `${getLocalePath()}/components/button`,
      children: componentOptionsRef.value
    },
    {
      key: 'github',
      label: 'GitHub'
    }
  ]
})
const mobileMenuValue = computed(() => {
  if (route.name === 'home')
    return 'home'
  return findMenuValue(mobileMenuOptions.value, route.path)
})
function handleUpdateMobileMenu(value: string, { path }: { path?: string }) {
  if (value.startsWith('theme:')) {
    themePreference.value = value.slice('theme:'.length) as ColorMode
  }
  else if (value === 'locale') {
    if (locale.value === 'zh-CN') {
      locale.value = 'en-US'
    }
    else {
      locale.value = 'zh-CN'
    }
  }
  else if (path) {
    router.push(path)
  }
  else {
    window.open(repoUrl, '_blank')
  }
  mobilePopoverRef.value?.setShow(false)
}

const localeLabelMap = {
  'zh-CN': 'English',
  'en-US': '中文'
}
function handleLocaleUpdate() {
  if (locale.value === 'zh-CN') {
    locale.value = 'en-US'
  }
  else {
    locale.value = 'zh-CN'
  }
}

// display mode
const displayMode = useDisplayMode()
const displayModeLabelMap: Record<string, string> = {
  common: 'Debug',
  debug: 'Prod'
}
function handleDisplayModeUpdate() {
  if (displayMode.value === 'common') {
    displayMode.value = 'debug'
  }
  else {
    displayMode.value = 'common'
  }
}

// config provider
const configProviderName = useConfigProviderName()
const cfgProviderLabelMap = computed<Record<string, string>>(() => ({
  tusimple: t('defaultTheme'),
  default: t('tusimpleTheme')
}))
function handleConfigProviderUpdate() {
  if (configProviderName.value === 'tusimple') {
    configProviderName.value = 'default'
  }
  else {
    configProviderName.value = 'tusimple'
  }
}

// search
const searchableOptionsRef = useFlattenedDocOptions()
const searchPattern = ref('')
const searchOptions = computed(() => {
  // function getLabel(item) {
  //   if (item.label) {
  //     return typeof item.extra === 'function'
  //       ? () => [item.label, ' ', item.extra()]
  //       : item.label + (item.extra ? ' ' + item.extra : '')
  //   }
  //   return item.key
  // }
  function getSearchableContent(item: SiteMenuOption): string {
    if (item.label) {
      return item.label + (item.extraString ? ` ${item.extraString}` : '')
    }
    return String(item.key)
  }
  if (!searchPattern.value)
    return []
  const replaceRegex = / |-/g
  return searchableOptionsRef.value
    .filter((item) => {
      const pattern = searchPattern.value
        .toLowerCase()
        .replace(replaceRegex, '')
        .slice(0, 20)
      const label = getSearchableContent(item)
        .toLowerCase()
        .replace(replaceRegex, '')
      return match(pattern, label)
    })
    .map(item => ({
      label: getSearchableContent(item),
      value: item.path
    }))
})
function handleSearch(value: string) {
  router.push(value)
}

// common
const isMobile = useIsMobile()
const isTablet = useIsTablet()
function handleLogoClick() {
  if (/^\/[^/]+$/.test(route.path)) {
    message.info(t('alreadyHome'))
    return
  }
  router.push(getLocalePath())
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

const tusimple = process.env.TUSIMPLE
const dev = __DEV__

const style = computed(() => {
  return isMobile.value
    ? {
        '--side-padding': '16px',
        'grid-template-columns': 'auto 1fr auto'
      }
    : {
        '--side-padding': '32px',
        'grid-template-columns': 'calc(272px - var(--side-padding)) 1fr auto'
      }
})
</script>

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
          <MenuOutline />
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
      <n-popselect
        v-model:value="themePreference"
        :options="themeOptions"
        trigger="click"
        placement="bottom"
      >
        <n-button size="small" quaternary class="nav-picker">
          {{ themePreferenceLabel }}
        </n-button>
      </n-popselect>
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
