<template>
  <aside
    class="n-layout-sider"
    :class="{
      [`n-layout-sider--${position}-positioned`]: position,
      [`n-layout-sider--bordered`]: bordered,
      [`n-layout-sider--collapsed`]: collapsed,
      [`n-layout-sider--show-content`]: showContent
    }"
    :style="{
      ...cssVars,
      transform: styleTransform,
      maxWidth: styleMaxWidth,
      width: styleWidth
    }"
  >
    <n-scrollbar
      v-if="!nativeScrollbar"
      ref="scrollbar"
      class="n-layout-sider__content"
      :unstable-theme="NLayout.mergedTheme.peers.Scrollbar"
      :unstable-theme-overrides="NLayout.mergedTheme.overrides.Scrollbar"
      v-bind="scrollbarProps"
    >
      <slot />
    </n-scrollbar>
    <div v-else class="n-layout-sider__content">
      <slot />
    </div>
    <div v-if="bordered" class="n-layout-sider__border" />
    <template v-if="showTrigger">
      <toggle-button
        v-if="showTrigger === 'arrow-circle'"
        :style="triggerStyle"
        @click="handleTriggerClick"
      />
      <toggle-bar
        v-else
        :collapsed="collapsed"
        :style="triggerStyle"
        @click="handleTriggerClick"
      />
    </template>
  </aside>
</template>

<script>
import { defineComponent, computed, nextTick } from 'vue'
import { useTheme } from '../../_mixins'
import { NScrollbar } from '../../scrollbar'
import { layoutLight } from '../styles'
import style from './styles/layout-sider.cssr.js'
import layoutModeMixin from './layoutModeMixin'
import ToggleButton from './ToggleButton.vue'
import ToggleBar from './ToggleBar.vue'

export default defineComponent({
  name: 'LayoutSider',
  components: {
    ToggleButton,
    ToggleBar,
    NScrollbar
  },
  mixins: [layoutModeMixin],
  props: {
    ...useTheme.props,
    bordered: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: 48
    },
    width: {
      type: Number,
      default: 272
    },
    collapseMode: {
      validator (value) {
        return ['width', 'transform'].includes(value)
      },
      default: 'transform'
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    showContent: {
      type: Boolean,
      default: true
    },
    showTrigger: {
      type: [Boolean, String],
      default: false
    },
    nativeScrollbar: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    scrollbarProps: {
      type: Object,
      default: undefined
    },
    triggerStyle: {
      type: Object,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:collapsed': {
      type: Function,
      default: undefined
    },
    // deprecated
    onExpand: {
      type: Function,
      default: undefined
    },
    onCollapse: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Layout',
      'LayoutSider',
      style,
      layoutLight,
      props
    )
    return {
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            siderColor,
            siderToggleButtonColor,
            siderBorderColor,
            siderToggleBarColor,
            siderToggleBarColorHover
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--sider-color': siderColor,
          '--sider-border-color': siderBorderColor,
          '--sider-toggle-button-color': siderToggleButtonColor,
          '--sider-toggle-bar-color': siderToggleBarColor,
          '--sider-toggle-bar-color-hover': siderToggleBarColorHover
        }
      })
    }
  },
  data () {
    return {
      collapseTimerId: null,
      styleWidth: null,
      styleMaxWidth: null
    }
  },
  computed: {
    styleTransform () {
      if (this.collapseMode === 'transform') {
        if (!this.collapsed) return 'translateX(0)'
        else return `translateX(-${this.width - this.collapsedWidth}px)`
      }
      return null
    }
  },
  watch: {
    width (value) {
      if (this.NLayout) {
        this.NLayout.siderWidth = value
      }
    },
    collapsedWidth (value) {
      if (this.NLayout) {
        this.NLayout.collapsedWidth = value
      }
    },
    collapseMode (value) {
      if (this.NLayout) {
        this.NLayout.siderCollapseMode = value
      }
    },
    position (value) {
      if (this.NLayout) {
        this.NLayout.siderPosition = value
      }
    },
    collapsed (value) {
      if (this.collapseMode === 'width') {
        if (this.collapseTimerId) {
          window.clearTimeout(this.collapseTimerId)
        }
        if (value) {
          this.styleMaxWidth = `${this.width}px`
          nextTick(() => {
            this.$el.getBoundingClientRect()
            this.styleMaxWidth = `${this.collapsedWidth}px`
          })
          this.collapseTimerId = window.setTimeout(() => {
            this.styleWidth = `${this.collapsedWidth}px`
            this.styleMaxWidth = null
          }, this.duration)
        } else {
          this.styleMaxWidth = `${this.collapsedWidth}px`
          this.styleWidth = `${this.width}px`
          nextTick(() => {
            this.$el.getBoundingClientRect()
            this.styleMaxWidth = `${this.width}px`
          })
          this.collapseTimerId = window.setTimeout(() => {
            this.styleMaxWidth = null
          }, this.duration)
        }
      }
      if (this.NLayout) {
        this.NLayout.siderCollapsed = value
      }
    }
  },
  created () {
    if (this.collapseMode === 'width') {
      if (this.collapsed) {
        this.styleWidth = `${this.collapsedWidth}px`
      } else {
        this.styleWidth = `${this.width}px`
      }
    } else {
      this.styleWidth = `${this.width}px`
    }
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.hasSider = true
      NLayout.siderWidth = this.width
      NLayout.collapsedSiderWidth = this.collapsedWidth
      NLayout.siderCollapseMode = this.collapseMode
      NLayout.siderPosition = this.position
      NLayout.siderCollapsed = this.collapsed
    }
  },
  beforeUnmount () {
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.hasSider = false
      NLayout.siderWidth = null
      NLayout.collapsedSiderWidth = null
      NLayout.siderCollapseMode = null
      NLayout.siderPosition = null
      NLayout.siderCollapsed = null
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
    handleTriggerClick () {
      const {
        'onUpdate:collapsed': onUpdateCollapsed,
        collapsed,
        // deprecated
        onExpand,
        onCollapse
      } = this
      if (onUpdateCollapsed) onUpdateCollapsed(!collapsed)
      if (collapsed) {
        if (onExpand) onExpand()
      } else {
        if (onCollapse) onCollapse()
      }
    }
  }
})
</script>
