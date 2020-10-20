<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${position}-positioned`]: true,
      'n-layout--has-sider': hasSider,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-layout--${siderCollapseMode}-collapse-mode`]: siderCollapseMode
    }"
    :style="syntheticLayoutStyle"
  >
    <n-scrollbar
      v-if="!useNativeScrollbar"
      ref="scrollbar"
      :theme="mergedTheme"
      :content-style="scrollContentStyle"
      :container-style="scrollContainerStyle"
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import { nextTick } from 'vue'
import NScrollbar from '../../scrollbar'
import layoutModeMixin from './layoutModeMixin'
import themeable from '../../_mixins/themeable'
import withapp from '../../_mixins/withapp'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/layout'

export default {
  name: 'Layout',
  cssrName: 'Layout',
  cssrId: 'Layout',
  components: {
    NScrollbar
  },
  mixins: [
    withapp,
    themeable,
    layoutModeMixin,
    usecssr(styles)
  ],
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
    syntheticLayoutStyle () {
      return Object.assign({
        marginLeft: this.styleMarginLeft,
        transition: this.transitionDisabled ? 'none' : null
      }, this.mergedStyle)
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
      nextTick(() => {
        this.childLayoutTransitionDisabled = false
      })
    }
  }
}
</script>
