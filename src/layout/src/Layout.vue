<template>
  <div
    class="n-layout"
    :class="{
      [`n-layout--${position}-positioned`]: true,
      'n-layout--has-sider': hasSider,
      [`n-layout--${siderCollapseMode}-collapse-mode`]: siderCollapseMode
    }"
    :style="mergedLayoutStyle"
  >
    <n-scrollbar
      v-if="!nativeScrollbar"
      ref="scrollbar"
      :unstable-theme="mergedTheme.peers.Scrollbar"
      :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
      v-bind="scrollbarProps"
    >
      <slot />
    </n-scrollbar>
    <slot v-else />
  </div>
</template>

<script>
import { nextTick, defineComponent, computed } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { useTheme } from '../../_mixins'
import { layoutLight } from '../styles'
import layoutModeMixin from './layoutModeMixin'
import style from './styles/layout.cssr.js'

export default defineComponent({
  name: 'Layout',
  alias: ['LayoutContent'],
  components: {
    NScrollbar
  },
  mixins: [layoutModeMixin],
  provide () {
    return {
      NLayout: this
    }
  },
  props: {
    ...useTheme.props,
    nativeScrollbar: {
      type: Boolean,
      default: true
    },
    scrollbarProps: {
      type: Object,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Layout', 'Layout', style, layoutLight, props)
    return {
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor
        }
      })
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
        if (
          NLayout.siderPosition === 'absolute' &&
          this.position === 'absolute'
        ) {
          if (NLayout.siderCollapsed) {
            return `${NLayout.collapsedSiderWidth}px`
          } else {
            return `${NLayout.siderWidth}px`
          }
        }
      }
      return null
    },
    mergedLayoutStyle () {
      return Object.assign(
        {
          marginLeft: this.styleMarginLeft,
          transition: this.transitionDisabled ? 'none' : null
        },
        this.cssVars
      )
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
})
</script>
