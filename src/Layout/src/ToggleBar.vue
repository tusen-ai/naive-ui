<template>
  <div
    class="n-layout-toggle-bar"
    :class="{
      'n-layout-toggle-bar--collapsed': collapsed
    }"
  >
    <div class="n-layout-toggle-bar__top" />
    <div class="n-layout-toggle-bar__bottom" />
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
