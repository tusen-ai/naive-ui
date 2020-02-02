<template>
  <div class="icon-wrapper">
    <div class="icon-wrapper__icon">
      <slot />
    </div>
    <div class="icon-wrapper__name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  fill: rgb(128, 128, 128);
  font-size: 36px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.icon-wrapper .icon-wrapper__name {
  font-size: 14px;
}
.icon-wrapper .icon-wrapper__icon {
  font-size: 48px;
}
</style>
