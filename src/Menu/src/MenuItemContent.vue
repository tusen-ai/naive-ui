<template>
  <div
    class="n-menu-item-content"
    :style="{ paddingLeft: paddingLeft && (paddingLeft + 'px') }"
    :class="{
      'n-menu-item-content--collapsed': collapsed,
      'n-menu-item-content--child-selected': childSelected,
      'n-menu-item-content--selected': selected,
      'n-menu-item-content--disabled': disabled,
      'n-menu-item-content--hover': hover,
      'n-menu-item-content--uncollapsable': uncollapsable
    }"
    @click="handleClick"
  >
    <div
      v-if="$slots.icon"
      class="n-menu-item-content__icon"
      :style="{
        width: maxIconSize && (maxIconSize + 'px'),
        height: maxIconSize && (maxIconSize + 'px'),
        fontSize: activeIconSize && (activeIconSize + 'px'),
      }"
    >
      <slot name="icon" />
    </div>
    <div class="n-menu-item-content-header">
      <slot name="header">
        <render :render="title" />
      </slot>
      <slot name="header-extra">
        <span v-if="titleExtra" class="n-menu-item-content-header__extra">
          <render v-if="titleExtra" :render="titleExtra" />
        </span>
      </slot>
    </div>
    <div v-if="showArrow" class="n-menu-item-content__arrow" />
  </div>
</template>

<script>
import render from '../../_utils/vue/render'

export default {
  name: 'NMenuItemContent',
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
      default: null
    },
    maxIconSize: {
      type: Number,
      default: null
    },
    activeIconSize: {
      type: Number,
      default: null
    },
    title: {
      type: [String, Function],
      default: null
    },
    titleExtra: {
      type: [String, Function],
      default: null
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    childSelected: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    uncollapsable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
