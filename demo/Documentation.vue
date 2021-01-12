<template>
  <n-service-layout
    ref="layout"
    :padding-body="false"
    :items="items"
    :sider-props="siderProps"
  >
    <router-view />
    <landing-footer
      style="padding: 32px 204px 16px 56px; text-align: left; font-size: 14px"
    />
  </n-service-layout>
</template>

<script>
import LandingFooter from './documentation/landing/Footer.vue'
import { useSiteOptions } from './util-composables'

export default {
  components: {
    LandingFooter
  },
  provide () {
    return {
      NDocRoot: this
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.memorizedPath = from ? from.path : null
    next()
  },
  setup () {
    return {
      items: useSiteOptions(),
      memorizedPath: null,
      siderProps: {
        style: {
          height: '100%'
        }
      }
    }
  },
  methods: {
    resetScrollPosition () {
      this.$refs.layout.scrollTo(0, 0)
    }
  }
}
</script>
