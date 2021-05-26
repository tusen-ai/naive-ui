<template>
  <n-layout :position="isXs ? undefined : 'absolute'" class="root-layout">
    <site-header />
    <router-view />
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
    })
    return {
      isXs: isXsRef
    }
  }
}
</script>
