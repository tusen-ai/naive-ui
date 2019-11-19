<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${mode}-positioned`]: mode,
      'n-layout--has-sider': hasSider,
    }"
    :style="{
      marginLeft: styleMarginLeft
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
      hasSider: false,
      siderWidth: null,
      collapsedSiderWidth: null,
      siderMode: null,
      siderCollapsed: null
    }
  },
  computed: {
    styleMarginLeft () {
      if (this.NLayout && this.NLayout.hasSider) {
        if (this.NLayout.siderMode === 'absolute' && this.mode === 'absolute') {
          if (this.NLayout.siderCollapsed) {
            return `${this.NLayout.collapsedSiderWidth}px`
          } else {
            return `${this.NLayout.siderWidth}px`
          }
        }
      }
      return null
    }
  }
}
</script>
