<i18n>
{
  "zh-cn": {
    "dark": "深色",
    "light": "浅色"
  },
  "en-us": {
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
    <div />
    <div class="theme-picker">
      <n-select
        v-model="NApp.$parent.theme"
        size="small"
        :options="options"
      />
    </div>
    <div class="lang-picker">
      <n-select
        :value="lang"
        size="small"
        :options="langOptions"
        @input="handleLangInput"
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
    }
  },
  data () {
    return {
      version,
      theme: 'dark',
      langOptions: [
        {
          label: '中文',
          value: 'zh-cn'
        },
        {
          label: 'English',
          value: 'en-us'
        }
      ]
    }
  },
  computed: {
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
    handleThemeChange (theme) {
      this.NApp.$parent.theme = theme
    },
    handleLangInput (lang) {
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
  transition: color .3s cubic-bezier(.4, 0, .2, 1);
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
