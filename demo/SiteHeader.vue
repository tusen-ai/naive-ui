<template>
  <n-layout-header bordered class="nav" :style="style">
    <n-text tag="div" class="ui-logo" :depth="1" @click="handleLogoClick">
      <img src="./assets/images/naivelogo.svg" />
      <span v-if="!isXs">Naive UI</span>
    </n-text>
    <div :style="!isXs ? 'display: flex; align-items: center;' : ''">
      <div class="nav-menu" v-if="!isS">
        <n-menu
          mode="horizontal"
          :value="menuValue"
          :options="menuOptions"
          @update:value="handleMenuUpdateValue"
        />
      </div>
      <n-auto-complete
        v-model:value="searchPattern"
        :style="!isXs ? 'width: 216px; margin-left: 24px' : undefined"
        :placeholder="t('searchPlaceholder')"
        :options="searchOptions"
        clear-after-select
        blur-after-select
        @select="handleSearch"
      />
    </div>
    <n-popover
      v-if="isXs"
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="click"
    >
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px"><menu-outline /></n-icon>
      </template>
      <div style="overflow: auto; max-height: 79vh">
        <n-menu
          :value="xsMenuValue"
          :options="xsMenuOptions"
          :indent="18"
          @update:value="handleUpdateXsMenu"
        />
      </div>
    </n-popover>
    <n-popover
      v-else-if="isS"
      style="padding: 0; width: 288px"
      placement="bottom-end"
      display-directive="show"
      trigger="hover"
    >
      <template #trigger>
        <n-icon size="20" style="margin-left: 12px"><menu-outline /></n-icon>
      </template>
      <div style="overflow: auto; max-height: 75vh">
        <n-menu
          :value="sMenuValue"
          :options="sMenuOptions"
          :indent="18"
          @update:value="handleUpdateSMenu"
        />
      </div>
    </n-popover>
    <!-- <div style="display: flex" v-else-if="isM">
      <n-popover
        style="padding: 0; width: 180px"
        placement="bottom-end"
        display-directive="show"
        trigger="hover"
      >
        <template #trigger>
          <n-icon size="20" style="margin-left: 12px"><menu-outline /></n-icon>
        </template>
        <n-menu
          :value="mMenuValue"
          :options="mMenuOptions"
          :indent="18"
          @update:value="handleUpdateMMenu"
        />
      </n-popover>
    </div> -->
    <div class="nav-end" v-else>
      <n-button text class="nav-picker" @click="handleThemeUpdate">
        {{ themeLabelMap[theme] }}
      </n-button>
      <n-button text class="nav-picker" @click="handleLocaleUpdate">
        {{ localeLabelMap[locale] }}
      </n-button>
      <n-button text class="nav-picker">Github</n-button>
      <n-text class="nav-picker">
        {{ version }}
      </n-text>
      <n-button
        v-if="dev"
        text
        class="nav-picker"
        @click="handleDisplayModeUpdate"
      >
        {{ displayModeLabelMap[displayMode] }}
      </n-button>
      <n-button
        v-if="tusimple || dev"
        text
        class="nav-picker"
        @click="handleConfigProviderUpdate"
      >
        {{ cfgProviderLabelMap[configProviderName] }}
      </n-button>
    </div>
  </n-layout-header>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage, version } from 'naive-ui'
import { MenuOutline } from '@vicons/ionicons5'
import { i18n, useIsXs, useIsM, useIsS } from './utils/composables'
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
    tusimpleTheme: 'Tusimple Theme',
    defaultTheme: 'Default Theme'
  }
}

export default {
  name: 'SiteHeader',
  components: {
    MenuOutline
  },
  setup () {
    const message = useMessage()
    const route = useRoute()
    const router = useRouter()

    // i18n
    const { t } = i18n(locales)

    // menu
    const menuOptionsRef = computed(() => {
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
    const themeAndLocaleReg = /^(\/[^/]+){2}/
    function handleMenuUpdateValue (value) {
      if (value === 'home') {
        router.push(themeAndLocaleReg.exec(route.path)[0])
      }
      if (value === 'doc') {
        if (!/^(\/[^/]+){2}\/docs/.test(route.path)) {
          router.push(
            themeAndLocaleReg.exec(route.path)[0] + '/docs/introduction'
          )
        }
      }
      if (value === 'component') {
        if (!/^(\/[^/]+){2}\/components/.test(route.path)) {
          router.push(
            themeAndLocaleReg.exec(route.path)[0] + '/components/button'
          )
        }
      }
    }
    const menuValueRef = computed(() => {
      if (/\/docs\//.test(route.path)) return 'doc'
      if (/\/components\//.test(route.path)) return 'component'
      else if (route.name === 'home') return 'home'
      return null
    })

    // m options
    // const mMenuOptionsRef = computed(() => [
    //   {
    //     key: 'theme',
    //     title: themeLabelMapRef.value[themeNameRef.value]
    //   },
    //   {
    //     key: 'locale',
    //     title: localeNameRef.value === 'zh-CN' ? 'English' : '中文'
    //   }
    // ])
    // function handleUpdateMMenu (value, { path }) {
    //   if (value === 'theme') {
    //     handleThemeUpdate()
    //   } else if (value === 'locale') {
    //     if (localeNameRef.value === 'zh-CN') {
    //       localeNameRef.value = 'en-US'
    //     } else {
    //       localeNameRef.value = 'zh-CN'
    //     }
    //   }
    // }

    // s opitions
    const sMenuOptionsRef = computed(() => {
      return [
        {
          key: 'theme',
          title: themeLabelMapRef.value[themeNameRef.value]
        },
        {
          key: 'locale',
          title: localeNameRef.value === 'zh-CN' ? 'English' : '中文'
        },
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
    function handleUpdateSMenu (value) {
      if (value === 'theme') {
        handleThemeUpdate()
      } else if (value === 'locale') {
        if (localeNameRef.value === 'zh-CN') {
          localeNameRef.value = 'en-US'
        } else {
          localeNameRef.value = 'zh-CN'
        }
      } else {
        handleMenuUpdateValue(value)
      }
    }
    // xs options
    const docOptionsRef = useDocOptions()
    const componentOptionsRef = useComponentOptions()
    const xsMenuOptionsRef = computed(() => {
      return [
        {
          key: 'theme',
          title: themeLabelMapRef.value[themeNameRef.value]
        },
        {
          key: 'locale',
          title: localeNameRef.value === 'zh-CN' ? 'English' : '中文'
        },
        {
          key: 'home',
          title: t('home')
        },
        {
          key: 'doc',
          title: t('doc'),
          children: docOptionsRef.value
        },
        {
          key: 'component',
          title: t('component'),
          children: componentOptionsRef.value
        }
      ]
    })
    const xsMenuValueRef = computed(() => {
      if (route.name === 'home') return 'home'
      return findMenuValue(xsMenuOptionsRef.value, route.path)
    })
    function handleUpdateXsMenu (value, { path }) {
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
        handleMenuUpdateValue(value)
      }
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
    const isXsRef = useIsXs()
    function handleLogoClick () {
      if (/^(\/[^/]+){2}$/.test(route.path)) {
        message.info(t('alreadyHome'))
        return
      }
      router.push(/^(\/[^/]+){2}/.exec(route.path)[0])
    }

    return {
      // xsMenuOptions,
      tusimple: process.env.TUSIMPLE,
      dev: __DEV__,
      message,
      t,
      version,
      isXs: isXsRef,
      isM: useIsM(),
      isS: useIsS(),
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
      handleMenuUpdateValue,
      // m menu
      // mMenuOptions: mMenuOptionsRef,
      // handleUpdateMMenu,
      // mMenuValue: null,
      // s menu
      sMenuOptions: sMenuOptionsRef,
      handleUpdateSMenu,
      sMenuValue: menuValueRef,
      // xs menu
      xsMenuOptions: xsMenuOptionsRef,
      handleUpdateXsMenu,
      xsMenuValue: xsMenuValueRef,
      // common
      handleLogoClick,
      style: computed(() => {
        return isXsRef.value
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
}
</script>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: 63px;
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
}

.nav-picker {
  margin-right: 24px;
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
.nav-menu .n-menu-item {
  height: 63px !important;
}
</style>
