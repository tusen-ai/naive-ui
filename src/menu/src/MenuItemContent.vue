<template>
  <div
    class="n-menu-item-content"
    :style="style"
    :class="{
      'n-menu-item-content--collapsed': collapsed,
      'n-menu-item-content--child-active': childActive,
      'n-menu-item-content--disabled': disabled,
      'n-menu-item-content--hover': hover
    }"
    @click="handleClick"
  >
    <div v-if="icon" class="n-menu-item-content__icon" :style="iconStyle">
      <render :render="icon" />
    </div>
    <div class="n-menu-item-content-header">
      <render :render="title" />
      <span v-if="extra" class="n-menu-item-content-header__extra">
        <render :render="extra" />
      </span>
    </div>
    <div v-if="showArrow" class="n-menu-item-content__arrow" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { render } from '../../_utils'

export default defineComponent({
  name: 'MenuItemContent',
  components: {
    render
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    paddingLeft: {
      type: Number,
      default: undefined
    },
    maxIconSize: {
      type: Number,
      default: undefined
    },
    activeIconSize: {
      type: Number,
      default: undefined
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    extra: {
      type: [String, Function],
      default: undefined
    },
    icon: {
      type: [String, Function],
      default: undefined
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    childActive: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    style () {
      const { paddingLeft } = this
      return { paddingLeft: paddingLeft && paddingLeft + 'px' }
    },
    iconStyle () {
      const { maxIconSize, activeIconSize } = this
      return {
        width: maxIconSize + 'px',
        height: maxIconSize + 'px',
        fontSize: activeIconSize + 'px'
      }
    }
  },
  methods: {
    handleClick () {
      this.onClick()
    }
  }
})
</script>
