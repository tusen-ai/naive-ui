<template>
  <div
    class="n-gradient-text"
    :style="style"
  >
    <div
      class="n-gradient-text__content"
      :class="{
        [`is-${type}`]: true
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NGradientText',
  props: {
    'fontSize': {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    style () {
      return {
        fontSize: this.fontSize + 'px'
      }
    }
  }
}
</script>
