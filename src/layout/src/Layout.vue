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
      v-if="!nativeScrollbar"
      ref="scrollbar"
      :theme="mergedTheme"
      v-bind="scrollbarProps"
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import { nextTick } from 'vue'
import { NScrollbar } from '../../scrollbar'
import layoutModeMixin from './layoutModeMixin'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles/layout'

export default {
  name: 'Layout',
  alias: ['LayoutContent'],
  cssrName: 'Layout',
  cssrId: 'Layout',
  components: {
    NScrollbar
  },
  mixins: [
    configurable,
    themeable,
    layoutModeMixin,
    withCssr(styles)
  ],
  provide () {
    return {
      NLayout: this
    }
  },
  props: {
    nativeScrollbar: {
      type: Boolean,
      default: true
    },
    scrollbarProps: {
      type: Object,
      default: undefined
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
      const { NLayout } = this
      if (NLayout && NLayout.hasSider) {
        if (NLayout.siderPosition === 'absolute' && this.position === 'absolute') {
          if (NLayout.siderCollapsed) {
            return `${NLayout.collapsedSiderWidth}px`
          } else {
            return `${NLayout.siderWidth}px`
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
      const { NLayout } = this
      if (NLayout && NLayout.childLayoutTransitionDisabled) {
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
