<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { onMounted } from 'vue'
import { loadingBarApiRef } from './routes/router'
import SiteHeader from './SiteHeader.vue'
import { useIsMobile } from './utils/composables'

defineOptions({ name: 'Site' })

const loadingBar = useLoadingBar()
const isMobile = useIsMobile()
onMounted(() => {
  loadingBarApiRef.value = loadingBar
  loadingBar.finish()
})
</script>

<template>
  <n-layout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <SiteHeader />
    <router-view />
  </n-layout>
</template>
