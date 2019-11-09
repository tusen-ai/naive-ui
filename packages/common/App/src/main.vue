<template>
  <div
    class="n-app"
    :class="{
      [`n-app--${theme}-theme`]: theme,
      [`n-${theme}-theme`]: theme
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NConfigProvider',
  provide () {
    return {
      NApp: this
    }
  },
  inject: {
    NApp: {
      default: null
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
  },
  computed: {
    synthesizedTheme () {
      if (this.theme !== null) {
        return this.theme
      } else {
        return (this.NApp && this.NApp.synthesizedTheme) || null
      }
    }
  }
}
</script>
