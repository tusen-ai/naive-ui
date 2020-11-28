<template>
  <div class="n-documentation">
    <slot />
  </div>
</template>

<script>
export default {
  inject: {
    NDocRoot: {
      default: null
    }
  },
  mounted () {
    const paramsRegex = /\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)/
    const {
      NDocRoot
    } = this
    if (NDocRoot.memorizedPath) {
      const memorizedPath = NDocRoot.memorizedPath
      const currentPath = this.$route.path
      const memorizedDemoName = (paramsRegex.exec(memorizedPath) || [])[4]
      const currentDemoName = (paramsRegex.exec(currentPath) || [])[4]
      if (
        memorizedDemoName &&
        currentDemoName &&
        memorizedDemoName !== currentDemoName
      ) {
        NDocRoot.resetScrollPosition()
      }
    }
  }
}
</script>

<style>
.n-documentation {
  padding: 32px 24px 24px 56px;
}
</style>
