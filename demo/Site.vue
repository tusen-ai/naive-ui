<template>
  <n-layout position="absolute" class="root-layout">
    <site-header />
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
import SiteHeader from './SiteHeader.vue'
import { loadingBarApiRef } from './routes/router'

export default {
  name: 'Site',
  components: {
    SiteHeader
  },
  inject: ['loadingBar'],
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
