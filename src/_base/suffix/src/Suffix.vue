<template>
  <transition name="n-base-suffix-transition">
    <div
      v-if="loading || (show && (clearable || arrow))"
      class="n-base-suffix"
      :class="{
        [`n-${theme}-theme`]: theme
      }"
      @mousedown="handleMouseDown"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <icon-switch-transition>
        <n-base-loading v-if="loading" :theme="theme" class="n-base-suffix-spin" />
        <div
          v-else-if="!arrow || (mouseHovered && clearable)"
          key="cross"
          class="n-base-suffix-cross"
          :class="{
            'n-base-suffix-cross--arrow': arrow
          }"
          @click="handleClick"
        >
          <cancel-icon />
        </div>
        <div
          v-else-if="(arrow && !clearable) || (arrow && !mouseHovered)"
          key="arrow"
          class="n-base-suffix-arrow"
          :class="{
            'n-base-suffix-arrow--active': active,
            'n-base-suffix-arrow--disabled': disabled
          }"
        />
      </icon-switch-transition>
    </div>
  </transition>
</template>

<script>
import CancelIcon from './CancelIcon.vue'
import IconSwitchTransition from '../../../_transition/IconSwitchTransition'
import NBaseLoading from '../../loading'
import usecssr from '../../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'NBaseSuffix',
  inject: {
    NFormItem: {
      default: null
    }
  },
  components: {
    CancelIcon,
    NBaseLoading,
    IconSwitchTransition
  },
  mixins: [
    usecssr(styles)
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
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
    },
    loading: {
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
      e.preventDefault()
      this.$emit('mousedown', e)
    }
  }
}
</script>
