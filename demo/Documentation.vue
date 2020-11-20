<template>
  <n-service-layout
    ref="layout"
    :padding-body="false"
    :items="Site.items"
    :sider-props="siderProps"
    :content-props="contentProps"
  >
    <router-view />
    <landing-footer style="padding: 32px 204px 16px 36px; text-align: left; font-size: 14px;" />
  </n-service-layout>
</template>

<script>
import LandingFooter from './documentation/landing/Footer.vue'

export default {
  components: {
    LandingFooter
  },
  provide () {
    return {
      NDocRoot: this
    }
  },
  inject: ['Site'],
  beforeRouteUpdate (to, from, next) {
    this.memorizedPath = from ? from.path : null
    next()
  },
  data () {
    return {
      memorizedPath: null,
      siderProps: {
        style: {
          height: '100%'
        }
      },
      contentProps: {
        // themedStyle: {
        //   light: {
        //     backgroundColor: '#FFF'
        //   }
        // }
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
