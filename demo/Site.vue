<template>
  <n-layout position="absolute" class="root-layout">
    <site-header :items="flattenedItems" />
    <n-layout class="home-layout" style="top: 64px; overflow: hidden;" position="absolute">
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { inject, toRef } from 'vue'
import SiteHeader from './SiteHeader.vue'
import menuOptions from './menu-options'
// import { i18n } from './init'
import { loadingBarApiRef } from './routes/router'
import { useMemo } from '../src/_utils/composition'

export default {
  name: 'Site',
  inject: [
    'SiteProvider',
    'loadingBar'
  ],
  components: {
    SiteHeader
  },
  provide () {
    return {
      Site: this
    }
  },
  setup () {
    const SiteProvider = inject('SiteProvider')
    return {
      menuGenerationOptions: useMemo(() => {
        return {
          theme: SiteProvider.theme,
          lang: SiteProvider.lang
        }
      }, [
        toRef(SiteProvider, 'theme'),
        toRef(SiteProvider, 'lang')
      ])
    }
  },
  computed: {
    items () {
      return menuOptions(this.menuGenerationOptions)
    },
    flattenedItems () {
      const flattenedItems = []
      const traverse = items => {
        if (items) {
          items.forEach(item => {
            if (item.childItems) traverse(item.childItems)
            else flattenedItems.push(item)
          })
        }
      }
      traverse(this.items)
      return flattenedItems
    }
  },
  mounted () {
    this.loadingBar.finish()
    loadingBarApiRef.value = this.loadingBar
  }
}
</script>

<style lang="scss" scoped>
.demo {
  z-index: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1080px;
}
</style>

<style lang="scss">
body {
  -webkit-text-size-adjust: 100%;
}

.root-layout.n-layout.n-light-theme {
  background-color: #FFF;
}
.home-layout.n-layout.n-light-theme {
  background-color: #FFF;
}
</style>
