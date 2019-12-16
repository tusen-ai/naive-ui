<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${mode}-positioned`]: mode,
      'n-layout--has-sider': hasSider,
    }"
    :style="{
      marginLeft: styleMarginLeft,
      transition: transitionBlocked ? 'none' : null
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
      siderCollapsed: null,
      childLayoutTransitionBlocked: false
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
    },
    transitionBlocked () {
      if (this.NLayout && this.NLayout.childLayoutTransitionBlocked) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    blockChildLayoutTransitionOneTick () {
      this.childLayoutTransitionBlocked = true
      this.$nextTick().then(() => {
        this.childLayoutTransitionBlocked = false
      })
    }
  }
}
</script>
