<template>
  <div
    :class="{[`n-${theme}-theme`]: theme}"
    class="n-base-loading"
  >
    <svg
      class="n-base-loading-circular"
      viewBox="25 25 50 50"
    >
      <circle
        :style="{
          strokeWidth
        }"
        class="n-base-loading-circular-path"
        cx="50"
        cy="50"
        fill="none"
        r="20"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'NBaseLoading',
  props: {
    theme: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: null
    }
  },
  mounted () {
    // console.log(this.strokeWidth)
  }
}
</script>
