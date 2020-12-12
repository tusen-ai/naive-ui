<template>
  <n-layout position="absolute" class="root-layout">
    <site-header :items="flattenedItems" />
    <n-layout
      class="home-layout"
      style="top: 64px; overflow: hidden"
      position="absolute"
    >
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { computed } from 'vue'
import SiteHeader from './SiteHeader.vue'
import menuOptions from './menu-options'
import { loadingBarApiRef } from './routes/router'
import {
  useSiteDisplayMode,
  useSiteTheme,
  useSiteLang
} from './util-composables'

export default {
  name: 'Site',
  components: {
    SiteHeader
  },
  inject: ['SiteProvider', 'loadingBar'],
  provide () {
    return {
      Site: this
    }
  },
  setup () {
    const themeRef = useSiteTheme()
    const langRef = useSiteLang()
    const displayModeRef = useSiteDisplayMode()
    const itemsRef = computed(() =>
      menuOptions({
        theme: themeRef.value,
        lang: langRef.value,
        mode: displayModeRef.value
      })
    )
    const flattenedItemsRef = computed(() => {
      const flattenedItems = []
      const traverse = (items) => {
        if (items) {
          items.forEach((item) => {
            if (item.childItems) traverse(item.childItems)
            else flattenedItems.push(item)
          })
        }
      }
      traverse(itemsRef.value)
      return flattenedItems
    })
    return {
      items: itemsRef,
      flattenedItems: flattenedItemsRef
    }
  },
  mounted () {
    this.loadingBar.finish()
    loadingBarApiRef.value = this.loadingBar
  }
}
</script>

<style scoped>
.demo {
  z-index: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1080px;
}
body {
  -webkit-text-size-adjust: 100%;
}

.root-layout.n-layout.n-light-theme {
  background-color: #fff;
}
.home-layout.n-layout.n-light-theme {
  background-color: #fff;
}
</style>
