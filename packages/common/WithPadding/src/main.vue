<template>
  <div
    class="nv-with-padding"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NvWithPadding',
  props: {
    paddingTop: {
      type: Number,
      default: 0
    },
    paddingRight: {
      type: Number,
      default: 0
    },
    paddingBottom: {
      type: Number,
      default: 0
    },
    paddingLeft: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      const paddingStyle = {}
      if (this.paddingTop) paddingStyle.paddingTop = this.paddingTop + 'px'
      if (this.paddingRight) paddingStyle.paddingRight = this.paddingRight + 'px'
      if (this.paddingBottom) paddingStyle.paddingBottom = this.paddingBottom + 'px'
      if (this.paddingLeft) paddingStyle.paddingLeft = this.paddingLeft + 'px'
      return paddingStyle
    }
  }
}
</script>
