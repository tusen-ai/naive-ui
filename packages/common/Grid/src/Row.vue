<template>
  <div
    class="n-row"
    :class="{
      'n-row--flex': flex
    }"
    :style="{
      margin: `0px ${-horizontalGutter / 2}px`,
      width: `calc(100% + ${horizontalGutter}px)`,
      alignItems: alignItems,
      justifyContent: justifyContent
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
    },
    flex: {
      type: Boolean,
      default: false
    },
    alignItems: {
      type: String,
      default: null
    },
    justifyContent: {
      type: String,
      default: null
    }
  },
  computed: {
    verticalGutter () {
      if (Array.isArray(this.gutter)) {
        return this.gutter[1] || 0
      }
      return 0
    },
    horizontalGutter () {
      if (Array.isArray(this.gutter)) {
        return this.gutter[0]
      }
      if (this.gutter) {
        return this.gutter
      }
      return 0
    }
  }
}
</script>
