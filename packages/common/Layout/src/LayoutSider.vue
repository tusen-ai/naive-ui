<template>
  <div
    class="n-layout-sider"
    :class="{
      [`n-layout-sider--${mode}-positioned`]: mode,
      [`n-layout-sider--bordered`]: bordered,
      [`n-layout-sider--collapsed`]: collapsed,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
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

export default {
  name: 'NLayoutSider',
  components: {
    ToggleButton
  },
  mixins: [ withapp, themeable, layoutModeMixin ],
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    showContent: {
      type: Boolean,
      default: true
    },
    showCollapseButton: {
      type: Boolean,
      default: false
    },
    useNativeScrollbar: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.hasSider = true
    }
  },
  beforeDestroy () {
    const NLayout = this.NLayout
    if (NLayout) {
      NLayout.hasSider = true
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
