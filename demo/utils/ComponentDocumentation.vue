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
    if (this.NDocRoot.memorizedPath) {
      const memorizedPath = this.NDocRoot.memorizedPath
      const currentPath = this.$route.path
      const memorizedDemoName = (paramsRegex.exec(memorizedPath) || [])[4]
      const currentDemoName = (paramsRegex.exec(currentPath) || [])[4]
      if (
        memorizedDemoName &&
        currentDemoName &&
        memorizedDemoName !== currentDemoName
      ) {
        this.NDocRoot.resetScrollPosition()
      }
    }
  }
}
</script>

<style>
.n-documentation {
  padding: 24px 24px 24px 56px;
}
</style>
