<template>
  <n-layout :position="isMobile ? undefined : 'absolute'" class="root-layout">
    <site-header />
    <n-layout
      class="home-layout"
      :style="isMobile ? undefined : 'top: 64px; overflow: hidden'"
      :position="isMobile ? undefined : 'absolute'"
    >
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { onMounted, inject } from 'vue'
import SiteHeader from './SiteHeader.vue'
import { loadingBarApiRef } from './routes/router'
import { useIsMobile } from './utils/composables'

export default {
  name: 'Site',
  components: {
    SiteHeader
  },
  setup () {
    const loadingBar = inject('loadingBar')
    const isMobileRef = useIsMobile()
    onMounted(() => {
      loadingBarApiRef.value = loadingBar
      loadingBar.finish()
      const memoedHash = window.location.hash
      if (memoedHash) {
        // scroll to hashed element
        window.location.hash = ''
        window.location.hash = memoedHash
      }
    })
    return {
      isMobile: isMobileRef
    }
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
</style>
