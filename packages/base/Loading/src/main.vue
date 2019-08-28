<template>
  <div class="n-base-loading">
    <svg
      viewBox="25 25 50 50"
      class="circular"
    ><circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      class="path"
    /></svg>
  </div>
</template>

<script>
export default {
  name: 'NBaseLoading',
  props: {
  }
}
</script>

<style lang="scss" scoped>
.n-base-loading {
  line-height: 1;
}

.circular {
  height: 100%;
  width: 100%;
  animation: loading-rotate 2s linear infinite;
  .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 8;
    stroke: #63E2B7;
    stroke-linecap: round;
  }
}

@keyframes loading-rotate {
  to {
    transform: rotate(1turn)
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px
  }
  to {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px
  }
}
</style>
