<template>
  <n-layout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <site-header />
    <router-view />
  </n-layout>
</template>

<script>
import { onMounted } from 'vue'
import { useLoadingBar } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import { loadingBarApiRef } from './routes/router'
import { useIsMobile } from './utils/composables'

export default {
  name: 'Site',
  components: {
    SiteHeader
  },
  setup () {
    const loadingBar = useLoadingBar()
    const isMobileRef = useIsMobile()
    onMounted(() => {
      loadingBarApiRef.value = loadingBar
      loadingBar.finish()
    })
    return {
      isMobile: isMobileRef
    }
  }
}
</script>
