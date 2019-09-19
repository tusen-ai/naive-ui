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
      options: [
        {
          label: 'dark',
          value: 'default'
        },
        {
          label: 'light',
          value: 'light'
        }
      ]
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
  grid-template-columns: 272px 1fr 160px;
  grid-template-rows: 64px;
  align-items: center;
}
.ui-logo {
  padding-left: 48px;
}
.theme-picker {
  padding-right: 48px;
}
</style>
