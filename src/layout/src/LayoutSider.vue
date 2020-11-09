<template>
  <aside
    class="n-layout-sider"
    :class="{
      [`n-layout-sider--${position}-positioned`]: position,
      [`n-layout-sider--bordered`]: bordered,
      [`n-layout-sider--collapsed`]: collapsed,
      [`n-layout-sider--show-content`]: showContent,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :style="{
      ...mergedStyle,
      transform: styleTransform,
      maxWidth: styleMaxWidth,
      width: styleWidth,
    }"
  >
    <n-scrollbar
      v-if="!useNativeScrollbar"
      ref="scrollbar"
      class="n-layout-sider__content"
      :theme="mergedTheme"
      :content-style="scrollContentStyle"
      :container-style="scrollContainerStyle"
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
        @click="handleToggleButtonClick"
      />
      <toggle-bar
        v-else
        :collapsed="collapsed"
        :style="triggerStyle"
        @click="handleToggleButtonClick"
      />
    </template>
  </aside>
</template>

<script>
import { nextTick } from 'vue'
import layoutModeMixin from './layoutModeMixin'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import ToggleButton from './ToggleButton.vue'
import ToggleBar from './ToggleBar.vue'
import NScrollbar from '../../scrollbar'
import styles from './styles/layout-sider'

export default {
  name: 'LayoutSider',
  cssrName: 'Layout',
  cssrId: 'LayoutSider',
  components: {
    ToggleButton,
    ToggleBar,
    NScrollbar
  },
  mixins: [
    configurable,
    themeable,
    layoutModeMixin,
    withCssr(styles)
  ],
  props: {
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
    useNativeScrollbar: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
    },
    scrollContentStyle: {
      type: Object,
      default: undefined
    },
    scrollContainerStyle: {
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
    handleToggleButtonClick () {
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
}
</script>
