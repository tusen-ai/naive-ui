<template>
  <div
    class="n-tab-label__corner"
    :class="{
      [`n-tab-label__corner--${direction}`]: direction
    }"
  >
    <svg
      viewBox="0 0 100 100"
    >
      <path
        v-if="direction==='right'"
        d="M0 0 L0 100 L100 100 A100 100 0 0 1 0 0"
      />
      <path
        v-else
        d="M100 0 L100 100 L0 100 A100 100 0 0 0 100 0"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'left'
    }
  }
}
</script>
