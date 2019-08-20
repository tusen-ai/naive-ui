<template>
  <div class="n-app">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NApp',
  provide () {
    return {
      NApp: this
    }
  },
  props: {
    namespace: {
      type: String,
      default: null
    }
  }
}
</script>
