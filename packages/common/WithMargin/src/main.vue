<template>
  <div
    class="nv-with-margin"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NvWithMargin',
  props: {
    marginTop: {
      type: Number,
      default: 0
    },
    marginRight: {
      type: Number,
      default: 0
    },
    marginBottom: {
      type: Number,
      default: 0
    },
    marginLeft: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      const marginStyle = {}
      if (this.marginTop) marginStyle.marginTop = this.marginTop + 'px'
      if (this.marginRight) marginStyle.marginRight = this.marginRight + 'px'
      if (this.marginBottom) marginStyle.marginBottom = this.marginBottom + 'px'
      if (this.marginLeft) marginStyle.marginLeft = this.marginLeft + 'px'
      return marginStyle
    }
  }
}
</script>
