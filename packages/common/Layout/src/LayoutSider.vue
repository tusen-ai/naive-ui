<template>
  <div
    class="n-layout-sider"
    :class="{
      [`n-layout-sider--${mode}-positioned`]: mode,
      [`n-layout-sider--bordered`]: bordered,
      [`n-layout-sider--collapsed`]: collapsed,
      [`n-layout-sider--show-content`]: showContent,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="{
      ...synthesizedStyle,
      transform: styleTransform,
      maxWidth: styleMaxWidth,
      width: styleWidth,
    }"
  >
    <n-scrollbar v-if="!useNativeScrollbar">
      <div class="n-layout-sider__content">
        <slot />
      </div>
    </n-scrollbar>
    <div v-else class="n-layout-sider__content">
      <slot />
    </div>
    <div
      v-if="showTrigger"
      class="n-layout-sider__toggle-button"
      @click="handleToggleButtonClick"
    >
      <toggle-button />
    </div>
  </div>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import ToggleButton from './ToggleButton'
import asthemecontext from '../../../mixins/asthemecontext'

export default {
  name: 'NLayoutSider',
  components: {
    ToggleButton
  },
  mixins: [ withapp, themeable, asthemecontext, layoutModeMixin ],
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
      type: String,
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
      type: Boolean,
      default: false
    },
    useNativeScrollbar: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 300
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
    mode (value) {
      if (this.NLayout) {
        this.NLayout.siderMode = value
      }
    },
    collapsed (value) {
      if (this.collapseMode === 'width') {
        if (this.collapseTimerId) {
          window.clearTimeout(this.collapseTimerId)
        }
        if (value) {
          this.styleMaxWidth = `${this.width}px`
          this.$nextTick().then(() => {
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
          this.$nextTick().then(() => {
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
  },
  mounted () {
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.blockChildLayoutTransitionOneTick()
      NLayout.hasSider = true
      NLayout.siderWidth = this.width
      NLayout.collapsedSiderWidth = this.collapsedWidth
      NLayout.siderMode = this.mode
      NLayout.siderCollapsed = this.collapsed
    }
  },
  beforeDestroy () {
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.hasSider = false
      NLayout.siderWidth = null
      NLayout.collapsedSiderWidth = null
      NLayout.siderMode = null
      NLayout.siderCollapsed = null
    }
  },
  methods: {
    handleToggleButtonClick () {
      if (this.collapsed) {
        this.$emit('expand')
      } else {
        this.$emit('collapse')
      }
    }
  }
}
</script>
