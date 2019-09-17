<template>
  <div
    class="n-app"
    :class="{
      [`n-app--${theme}-theme`]: theme
    }"
  >
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
    },
    theme: {
      type: String,
      default: null
    }
  }
}
</script>
