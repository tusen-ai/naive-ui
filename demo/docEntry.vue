<template>
  <n-nimbus-service-layout
    ref="layout"
    :padding-body="false"
    :items="items"
  >
    <router-view />
  </n-nimbus-service-layout>
</template>

<script>
export default {
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
