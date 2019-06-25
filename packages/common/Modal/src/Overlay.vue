<template>
  <transition name="n-modal-overlay--transition">
    <div
      v-if="active"
      :key="'overlay'"
      class="n-modal-overlay"
      v-on="$listeners"
    />
  </transition>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.n-modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .35);
}

.n-modal-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
}

.n-modal-overlay--transition-enter-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(0.0, 0.0, 0.2, 1);
}

.n-modal-overlay--transition-leave-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(0.0, 0.0, 0.2, 1);
}

.n-modal-overlay--transition-enter, .n-modal-overlay--transition-leave-to {
  opacity: 0;
}
</style>
