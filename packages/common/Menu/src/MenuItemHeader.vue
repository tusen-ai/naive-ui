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
    <div class="n-menu-item-wrapper__header">
      <slot>
        <render :render="title" />
      </slot>
    </div>
  </div>
</template>

<script>
import render from '../../../utils/render'

export default {
  name: 'NMenuItemHeader',
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
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
