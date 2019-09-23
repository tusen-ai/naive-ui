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
      NAIVE UI ({{ version }})
    </div>
    <div />
    <div class="theme-picker">
      <n-select
        v-model="theme"
        size="small"
        :options="options"
        @change="handleThemeChange"
      />
    </div>
    <div class="lang-picker">
      <n-select
        v-model="$parent.$i18n.locale"
        size="small"
        :options="langOptions"
      />
    </div>
  </div>
</template>

<script>
import { version } from '../package.json'
import withapp from '../packages/mixins/withapp'

export default {
  mixins: [withapp],
  data () {
    return {
      version,
      theme: 'default',
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
          value: 'default'
        },
        {
          label: this.$t('light'),
          value: 'light'
        }
      ]
    }
  },
  watch: {
    '$i18n.locale': function (value) {
      console.log(this.$i18n)
      console.log(this.$parent.$i18n)
    }
  },
  methods: {
    handleThemeChange (theme) {
      this.NApp.$parent.theme = theme
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: grid;
  grid-template-columns: 272px 1fr 128px 160px;
  grid-template-rows: 64px;
  align-items: center;
}
.ui-logo {
  padding-left: 48px;
}
.theme-picker {
  padding-right: 16px;
}
.lang-picker {
  padding-right: 48px;
}
</style>
