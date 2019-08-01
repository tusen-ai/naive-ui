<template>
  <transition name="n-modal-content--transition">
    <div
      v-if="active"
      :key="'content'"
      class="n-modal-content"
      v-on="$listeners"
    >
      <slot />
    </div>
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
.n-modal-content {
  &::-webkit-scrollbar {
    width: 0px;
  }
}

.n-modal-content--transition-enter-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(0.0, 0.0, 0.2, 1), transform .3s cubic-bezier(0.0, 0.0, 0.2, 1);
  transform: scale(1);
}

.n-modal-content--transition-leave-active {
  opacity: 1;
  transition: opacity .3s cubic-bezier(0.0, 0.0, 0.2, 1), transform .3s cubic-bezier(0.4, 0.0, 1, 1);
  transform: scale(1);
}

.n-modal-content--transition-enter, .n-modal-content--transition-leave-to {
  opacity: 0;
  transform: scale(.75);
}
</style>
