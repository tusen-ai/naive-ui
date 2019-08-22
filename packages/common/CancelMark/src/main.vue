<template>
  <transition name="n-cancel-mark--transition">
    <div
      v-if="show && (clearable || arrow)"
      class="n-cancel-mark"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <transition name="n-cancel-mark--transition">
        <div
          v-if="!arrow || showCancelMarkCross"
          class="n-cancel-mark-cross"
          :class="{
            'n-cancel-mark-cross--arrow': arrow
          }"
          @click="handleClick"
        >
          <cancel-icon />
        </div>
      </transition>
      <transition name="n-cancel-mark--transition">
        <div
          v-if="arrow && !showCancelMarkCross"
          class="n-cancel-mark-arrow"
          :class="{
            'n-cancel-mark-arrow--active': active,
            'n-cancel-mark-arrow--disabled': disabled
          }"
        />
      </transition>
    </div>
  </transition>
</template>

<script>
import CancelIcon from './CancelIcon'
export default {
  name: 'NCancelMark',
  components: { CancelIcon },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showCancelMarkCross: false
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('clear', e)
    },
    handleMouseEnter () {
      if (!this.disabled && this.clearable) this.showCancelMarkCross = true
    },
    handleMouseLeave () {
      if (!this.disabled && this.clearable) this.showCancelMarkCross = false
    }
  }
}
</script>
