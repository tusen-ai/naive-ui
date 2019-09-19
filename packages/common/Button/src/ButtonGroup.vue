<template>
  <div
    class="n-button-group"
    :class="{
      'n-button-group--vertical': vertical
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NButtonGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
