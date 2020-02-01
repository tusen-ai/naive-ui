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
    this.NDocRoot.resetScrollPosition()
  }
}
</script>

<style>
.n-documentation {
  padding: 24px 24px 24px 56px;
}
</style>
