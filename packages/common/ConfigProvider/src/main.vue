<template>
  <div
    class="n-app"
    :class="{
      [`n-app--${theme}-theme`]: theme,
      [`n-${theme}-theme`]: theme
    }"
    :style="synthesizedStyle"
  >
    <slot />
  </div>
</template>

<script>
import themeable from '../../../mixins/themeable'

export default {
  name: 'NConfigProvider',
  mixins: [themeable],
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
    }
  }
}
</script>
