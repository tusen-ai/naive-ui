<template>
  <div class="n-gradient-header">
    <div
      class="header"
      :style="style"
    >
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NGradientHeader',
  props: {
    'fontSize': {
      type: Number,
      default: 16
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
