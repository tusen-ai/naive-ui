<template>
  <aside
    class="n-layout-sider"
    :class="{
      [`n-layout-sider--${position}-positioned`]: position,
      [`n-layout-sider--bordered`]: bordered,
      [`n-layout-sider--collapsed`]: collapsed,
      [`n-layout-sider--show-content`]: showContent,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="{
      ...syntheticStyle,
      transform: styleTransform,
      maxWidth: styleMaxWidth,
      width: styleWidth,
    }"
  >
    <n-scrollbar
      v-if="!useNativeScrollbar"
      ref="scrollbar"
      class="n-layout-sider__content"
      :theme="syntheticTheme"
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
        @click.native="handleToggleButtonClick"
      />
      <toggle-bar
        v-else
        :collapsed="collapsed"
        :style="triggerStyle"
        @click.native="handleToggleButtonClick"
      />
    </template>
  </aside>
</template>

<script>
import layoutModeMixin from './layoutModeMixin'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
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
    withapp,
    themeable,
    layoutModeMixin,
    usecssr(styles)
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
      default: null
    },
    scrollContainerStyle: {
      type: Object,
      default: null
    },
    triggerStyle: {
      type: Object,
      default: null
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
  beforeDestroy () {
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
      if (this.collapsed) {
        this.$emit('expand')
      } else {
        this.$emit('collapse')
      }
    }
  }
}
</script>
