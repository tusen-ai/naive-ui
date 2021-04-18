<template>
  <n-layout :position="isXs ? undefined : 'absolute'" class="root-layout">
    <site-header />
    <n-layout
      class="home-layout"
      :style="isXs ? undefined : 'top: 64px; overflow: hidden'"
      :position="isXs ? undefined : 'absolute'"
    >
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script>
import { onMounted } from 'vue'
import { useLoadingBar } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import { loadingBarApiRef } from './routes/router'
import { useIsXs } from './utils/composables'

export default {
  name: 'Site',
  components: {
    SiteHeader
  },
  setup () {
    const loadingBar = useLoadingBar()
    const isXsRef = useIsXs()
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
      isXs: isXsRef
    }
  }
}
</script>
