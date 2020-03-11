<template>
  <n-nimbus-service-layout
    ref="layout"
    :padding-body="false"
    :items="items"
    :sider-style="{
      height: 'calc(100vh - 64px)',
    }"
    :content-style="{
      height: 'calc(100vh - 64px)',
    }"
  >
    <router-view />
    <landing-footer style="padding: 32px 204px 16px 56px; text-align: left; font-size: 14px;" />
  </n-nimbus-service-layout>
</template>

<script>
import LandingFooter from './documentation/landing/footer'

export default {
  components: {
    LandingFooter
  },
  provide () {
    return {
      NDocRoot: this
    }
  },
  inject: {
    NEntry: {
      default: null
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.memorizedPath = from ? from.path : null
    next()
  },
  data () {
    return {
      memorizedPath: null
    }
  },
  computed: {
    items () {
      return this.NEntry.items
    }
  },
  methods: {
    resetScrollPosition () {
      this.$refs.layout.scrollTo(0, 0)
    }
  }
}
</script>
