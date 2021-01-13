<template>
  <n-service-layout
    ref="layout"
    :padding-body="false"
    :items="items"
    :sider-props="siderProps"
  >
    <router-view />
  </n-service-layout>
</template>

<script>
import { useDocOptions } from '../../store'

export default {
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
      items: useDocOptions(),
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
