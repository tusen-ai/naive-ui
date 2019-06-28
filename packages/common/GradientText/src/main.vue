<template>
  <div
    class="n-gradient-text"
    :class="{
      [`n-gradient-text--${type}-type`]: true
    }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NGradientText',
  props: {
    size: {
      type: [String, Number],
      default: null
    },
    fontSize: {
      type: [String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    style () {
      const style = {}
      const fontSize = this.size || this.fontSize
      if (fontSize) style.fontSize = fontSize + 'px'
      return style
    }
  }
}
</script>
