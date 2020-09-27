<template>
  <n-nimbus-service-layout
    ref="layout"
    :padding-body="false"
    :items="items"
    :sider-style="siderStyle"
    :content-style="contentStyle"
    :body-themed-style="bodyThemedStyle"
  >
    <router-view />
    <landing-footer style="padding: 32px 204px 16px 56px; text-align: left; font-size: 14px;" />
  </n-nimbus-service-layout>
</template>

<script>
import LandingFooter from './documentation/landing/Footer'

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
    Site: {
      default: null
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.memorizedPath = from ? from.path : null
    next()
  },
  data () {
    return {
      memorizedPath: null,
      siderStyle: {
        height: '100%'
      },
      contentStyle: {
        height: '100%'
      },
      bodyThemedStyle: {
        light: {
          backgroundColor: '#FFF'
        }
      }
    }
  },
  computed: {
    items () {
      return this.Site.items
    }
  },
  methods: {
    resetScrollPosition () {
      this.$refs.layout.scrollTo(0, 0)
    }
  }
}
</script>
