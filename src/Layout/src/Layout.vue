<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${position}-positioned`]: true,
      'n-layout--has-sider': hasSider,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-layout--${siderCollapseMode}-collapse-mode`]: siderCollapseMode
    }"
    :style="syntheticStyle"
  >
    <n-scrollbar
      v-if="!useNativeScrollbar"
      ref="scrollbar"
      :theme="syntheticTheme"
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
    },
    themedStyle: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      hasSider: false,
      siderWidth: null,
      collapsedSiderWidth: null,
      siderCollapseMode: null,
      siderPosition: null,
      siderCollapsed: null,
      childLayoutTransitionDisabled: false
    }
  },
  computed: {
    styleMarginLeft () {
      if (this.NLayout && this.NLayout.hasSider) {
        if (this.NLayout.siderPosition === 'absolute' && this.position === 'absolute') {
          if (this.NLayout.siderCollapsed) {
            return `${this.NLayout.collapsedSiderWidth}px`
          } else {
            return `${this.NLayout.siderWidth}px`
          }
        }
      }
      return null
    },
    syntheticStyle () {
      const themedStyle = this.themedStyle
      return Object.assign({
        marginLeft: this.styleMarginLeft,
        transition: this.transitionDisabled ? 'none' : null
      }, themedStyle ? themedStyle[this.syntheticTheme] : null)
    },
    transitionDisabled () {
      if (this.NLayout && this.NLayout.childLayoutTransitionDisabled) {
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
      this.childLayoutTransitionDisabled = true
      this.$nextTick().then(() => {
        this.childLayoutTransitionDisabled = false
      })
    }
  }
}
</script>
