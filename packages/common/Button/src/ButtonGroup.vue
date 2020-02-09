<template>
  <div
    class="n-button-group"
    :class="{
      'n-button-group--vertical': vertical,
      'n-button-group--block': block
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NButtonGroup',
  provide () {
    return {
      NButtonGroup: this
    }
  },
  props: {
    size: {
      type: String,
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
