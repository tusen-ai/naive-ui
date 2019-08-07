<template>
  <div
    class="n-badge"
    :class="{
      'n-badge--dot': dot,
      [`n-badge--${type}-type`]: type
    }"
  >
    <slot />
    <sup
      v-if="value !== null || dot"
      class="n-badge-sup"
    >{{ dot ? null : (max === null || typeof value === 'string') ? value : (value > max ? `${max}+` : value) }}</sup>
  </div>
</template>

<script>
export default {
  name: 'NBadge',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    dot: {
      type: Boolean,
      default: false
    },
    type: {
      validator () {
        return ['success', 'error', 'warning', 'info']
      },
      default: null
    }
  }
}
</script>
