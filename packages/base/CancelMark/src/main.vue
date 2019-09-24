<template>
  <transition name="n-cancel-mark--transition">
    <div
      v-if="show && (clearable || arrow)"
      class="n-cancel-mark"
      @mousedown="handleMouseDown"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <transition name="n-cancel-mark--transition">
        <div
          v-if="!arrow || (mouseHovered && clearable)"
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
          v-if="(arrow && !clearable) || (arrow && !mouseHovered)"
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
  name: 'NBaseCancelMark',
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
      mouseHovered: false
    }
  },
  watch: {
    clearable (newValue) {
      if (!newValue) {
        this.mouseHovered = false
      }
    },
    show (newValue) {
      if (!newValue) {
        this.mouseHovered = false
      }
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('clear', e)
    },
    handleMouseEnter () {
      this.mouseHovered = true
    },
    handleMouseLeave () {
      this.mouseHovered = false
    },
    handleMouseDown (e) {
      this.$emit('mousedown', e)
    }
  }
}
</script>
