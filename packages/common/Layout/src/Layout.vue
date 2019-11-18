<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${mode}-positioned`]: mode,
      'n-layout--has-sider': hasSider,
    }"
  >
    <n-scrollbar v-if="!useNativeScrollbar">
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'

export default {
  name: 'NLayout',
  mixins: [ layoutModeMixin ],
  provide () {
    return {
      NLayout: this
    }
  },
  props: {
    mode: {
      type: String,
      default: 'default'
    },
    useNativeScrollbar: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hasSider: false
    }
  }
}
</script>
