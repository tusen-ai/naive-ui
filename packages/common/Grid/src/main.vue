<template>
  <div class="n-row">
    <slot />
  </div>
</template>

<script>
export default {
  provide () {
    return {
      NRow: this
    }
  },
  name: 'NRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
.n-row {
  width: 100%;
}
</style>
