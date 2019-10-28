<template>
  <div
    class="n-row"
    :style="{
      margin: `${-verticalGutter}px ${- horizontalGutter / 2}px`,
      width: `calc(100% + ${horizontalGutter}px)`
    }"
  >
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
      type: [Array, Number],
      default: 0
    }
  },
  computed: {
    verticalGutter () {
      if (Array.isArray(this.gutter)) {
        return this.gutter[1]
      }
      return 0
    },
    horizontalGutter () {
      if (Array.isArray(this.gutter)) {
        return this.gutter[0]
      } if (this.gutter) {
        return this.gutter
      }
      return 0
    }
  }
}
</script>

<style>
.n-row {
  width: 100%;
}
</style>
