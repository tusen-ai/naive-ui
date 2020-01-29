<i18n>
{
  "zh-CN": {
    "dark": "深色",
    "light": "浅色"
  },
  "en-US": {
    "dark": "Dark",
    "light": "Light"
  }
}
</i18n>

<template>
  <div class="nav">
    <div class="ui-logo">
      <img src="./assets/images/naivelogo.svg">
      Naive UI ({{ version }})
    </div>
    <div style="width: 200px; margin-left: 48px;">
      <n-auto-complete
        v-model="searchInputValue"
        placeholder="Search in Naive UI"
        :options="searchOptions"
        clear-after-select
        blur-after-select
        @select="handleSelect"
      />
    </div>
    <div class="theme-picker">
      <n-select
        v-model="NConfigProvider.$parent.theme"
        size="small"
        :options="options"
      />
    </div>
    <div class="lang-picker">
      <n-select
        :value="lang"
        size="small"
        :options="langOptions"
        @change="handleLanguageChange"
      />
    </div>
  </div>
</template>

<script>
import { version } from '../package.json'
import withapp from '../packages/mixins/withapp'

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
      theme: 'dark',
      langOptions: [
        {
          label: '中文',
          value: 'zh-CN'
        },
        {
          label: 'English',
          value: 'en-US'
        }
      ]
    }
  },
  computed: {
    searchOptions () {
      if (!this.searchInputValue) return []
      return this.items.filter(item => {
        // console.log(item.name.toLowerCase(), this.searchInputValue.toLowerCase())
        return ~item.name.toLowerCase().indexOf(this.searchInputValue.toLowerCase())
      }).map(item => ({
        label: item.name,
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
    handleSelect (value) {
      this.$router.push(value)
      document.body.focus()
    },
    handleThemeChange (theme) {
      this.NConfigProvider.$parent.theme = theme
    },
    handleLanguageChange (lang) {
      this.$emit('lang-change', lang)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: grid;
  grid-template-columns: 272px 1fr 96px 140px;
  grid-template-rows: 64px;
  align-items: center;
}
.ui-logo {
  display: flex;
  align-items: center;
  padding-left: 44px;
  font-size: 18px;
}
.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}
.theme-picker {
  padding-right: 16px;
}
.lang-picker {
  padding-right: 48px;
}
</style>
