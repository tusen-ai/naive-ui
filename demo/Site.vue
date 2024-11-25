<script lang="ts">
import { useLoadingBar } from 'naive-ui'
import { defineComponent, onMounted } from 'vue'
import { loadingBarApiRef } from './routes/router'
import SiteHeader from './SiteHeader.vue'
import { useIsMobile } from './utils/composables'

export default defineComponent({
  name: 'Site',
  components: {
    SiteHeader
  },
  setup() {
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
})
</script>

<template>
  <n-layout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <SiteHeader />
    <router-view />
  </n-layout>
</template>
