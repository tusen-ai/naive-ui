<i18n>
{
  "zh-CN": {
    "dark": "深色",
    "light": "浅色",
    "searchPlaceholder": "搜索组件",
    "home": "首页",
    "doc": "文档",
    "alreadyHome": "别点了，你已经在首页了"
  },
  "en-US": {
    "dark": "Dark",
    "light": "Light",
    "searchPlaceholder": "Search Components",
    "home": "Home",
    "doc": "Documentation",
    "alreadyHome": "You've already been in home page. No clicking."
  }
}
</i18n>

<template>
  <div class="nav">
    <div class="ui-logo" @click="handleLogoClick">
      <img src="./assets/images/naivelogo.svg">
      Naive UI ({{ version }})
    </div>
    <div style=" margin-left: 56px; display: flex; align-items: center;">
      <n-auto-complete
        v-model="searchInputValue"
        style="width: 216px;"
        :z-index="3001"
        :placeholder="$t('searchPlaceholder')"
        :options="searchOptions"
        clear-after-select
        blur-after-select
        @select="handleSelect"
      />
      <div class="nav-menu">
        <n-menu mode="horizontal" :value="menuValue" @select="handleMenuSelect">
          <n-menu-item :title="$t('home')" name="home" />
          <n-menu-item :title="$t('doc')" name="doc" />
        </n-menu>
      </div>
    </div>
    <div style="display: flex;">
      <n-tag style="cursor: pointer; margin-right: 12px;" @click.native="handleThemeChange">
        {{ themeOptions[theme].label }}
      </n-tag>
      <n-tag style="cursor: pointer;" @click.native="handleLanguageChange">
        {{ langOptions[lang].label }}
      </n-tag>
    </div>
  </div>
</template>

<script>
import { version } from '../package.json'
import withapp from '../src/_mixins/withapp'

function match (pattern, string) {
  if (!pattern.length) return true
  if (!string.length) return false
  if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
  return match(pattern, string.slice(1))
}

export default {
  mixins: [withapp],
  props: {
    lang: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchInputValue: '',
      version,
      themeOptions: {
        dark: {
          label: 'Light',
          next: 'light'
        },
        light: {
          label: 'Dark',
          next: 'dark'
        }
      },
      langOptions: {
        'zh-CN': {
          label: 'English',
          next: 'en-US'
        },
        'en-US': {
          label: '中文',
          next: 'zh-CN'
        }
      }
    }
  },
  computed: {
    theme () {
      return this.NConfigProvider.$parent.theme
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
    },
    options: function () {
      return [
        {
          label: this.$t('dark'),
          value: 'dark'
        },
        {
          label: this.$t('light'),
          value: 'light'
        }
      ]
    }
  },
  methods: {
    handleLogoClick () {
      if (/^(\/[^/]+){2}$/.test(this.$route.path)) {
        this.$NMessage.info(this.$t('alreadyHome'))
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
      this.NConfigProvider.$parent.theme = this.themeOptions[this.theme].next
    },
    handleLanguageChange () {
      this.$emit('lang-change', this.langOptions[this.lang].next)
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
.nav-menu .n-menu-item {
  height: 63px !important;
}
</style>
