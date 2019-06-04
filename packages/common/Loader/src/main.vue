<template>
  <div class="nv-loader__mask">
    <div class="nv-loader__loader">
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
  </div>
</template>

<script>
export default {
  name: 'NvLoader',
  props: {
  }
}
</script>

<style lang="scss" scoped>
.nv-loader__mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite;
    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90,150;
      stroke-dashoffset: 0;
      stroke-width: 3;
      stroke: #63E2B7;
      stroke-linecap: round;
    }
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
