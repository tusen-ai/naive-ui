<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${mode}-positioned`]: mode,
      'n-layout--has-sider': hasSider,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="{
      marginLeft: styleMarginLeft,
      transition: transitionBlocked ? 'none' : null
    }"
  >
    <n-scrollbar
      v-if="!useNativeScrollbar"
      ref="scrollbar"
      :content-style="scrollContentStyle"
      :container-style="scrollContainerStyle"
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import NScrollbar from '../../Scrollbar'

export default {
  name: 'NLayout',
  components: {
    NScrollbar
  },
  mixins: [ withapp, themeable, layoutModeMixin ],
  provide () {
    return {
      NLayout: this
    }
  },
  props: {
    useNativeScrollbar: {
      type: Boolean,
      default: true
    },
    scrollContentStyle: {
      type: Object,
      default: null
    },
    scrollContainerStyle: {
      type: Object,
      default: null
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
    scrollTo (...args) {
      if (this.$refs.scrollbar) {
        this.$refs.scrollbar.scrollTo(...args)
      } else {
        this.$el.scrollTo(...args)
      }
    },
    blockChildLayoutTransitionOneTick () {
      this.childLayoutTransitionBlocked = true
      this.$nextTick().then(() => {
        this.childLayoutTransitionBlocked = false
      })
    }
  }
}
</script>
