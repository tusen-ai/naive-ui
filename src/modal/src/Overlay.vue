<template>
  <transition name="n-fade-in-transition">
    <div
      v-if="active"
      :key="'overlay'"
      class="n-modal-overlay"
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
