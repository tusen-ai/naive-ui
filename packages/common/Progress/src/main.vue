<template>
  <div
    :style="{
      width: width + 'px',
      height: width + 'px'
    }"
  >
    <svg viewBox="0 0 100 100">
      <g>
        <path
          d="
        m 50 3
        a 47 47 0 1 1 0 94
        a 47 47 0 1 1 0 -94
        "
          stroke-width="3"
          stroke-linecap="round"
          stroke="white"
          fill="none"
          style="stroke-dasharray: 157, 1000; stroke-dashoffset: 0;"
        />
      </g>
      <g>
        <path
          d="
        m 50 6
        a 44 44 0 1 1 0 88
        a 44 44 0 1 1 0 -88
        "
          stroke-width="3"
          stroke-linecap="round"
          stroke="red"
          fill="none"
          style="stroke-dasharray: 120, 1000; stroke-dashoffset: 0;"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'NProgress',
  data () {
    return {
      width: 126
    }
  }
}
</script>
