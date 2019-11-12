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
  props: {
    block: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
