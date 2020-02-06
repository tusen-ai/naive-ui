<template>
  <div class="n-menu-item-wrapper">
    <div
      v-if="$slots.icon"
      class="n-menu-item-wrapper__icon"
      :style="{
        width: maxIconSize && (maxIconSize + 'px'),
        height: maxIconSize && (maxIconSize + 'px'),
        fontSize: activeIconSize && (activeIconSize + 'px'),
      }"
    >
      <slot name="icon" />
    </div>
    <div class="n-menu-item-header">
      <slot>
        <render :render="title" />
      </slot>
      <slot name="header-extra">
        <span class="n-menu-item-header__extra">
          <render v-if="titleExtra" :render="titleExtra" />
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
import render from '../../../utils/render'

export default {
  name: 'NMenuItemContentWrapper',
  components: {
    render
  },
  props: {
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
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
