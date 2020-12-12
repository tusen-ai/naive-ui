<template>
  <transition name="n-fade-in-scale-up-transition">
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
      <n-icon-switch-transition>
        <n-base-loading
          v-if="loading"
          key="loading"
          :theme="theme"
          class="n-base-suffix-spin"
        />
        <div
          v-else-if="!arrow || (mouseHovered && clearable)"
          key="cross"
          class="n-base-suffix-cross"
          @click="handleClick"
        >
          <dismiss-circle-icon />
        </div>
        <div
          v-else-if="(arrow && !clearable) || (arrow && !mouseHovered)"
          key="arrow"
          class="n-base-suffix-arrow"
          :class="{
            'n-base-suffix-arrow--active': active,
            'n-base-suffix-arrow--disabled': disabled
          }"
        >
          <chevron-down-icon />
        </div>
      </n-icon-switch-transition>
    </div>
  </transition>
</template>

<script>
import { ChevronDownIcon, DismissCircleIcon } from '../../icons'
import { NIconSwitchTransition } from '../../../_base'
import NBaseLoading from '../../loading'
import { withCssr } from '../../../_mixins'
import styles from './styles'

export default {
  name: 'BaseSuffix',
  components: {
    DismissCircleIcon,
    ChevronDownIcon,
    NBaseLoading,
    NIconSwitchTransition
  },
  mixins: [withCssr(styles)],
  inject: {
    NFormItem: {
      default: null
    }
  },
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
    },
    onClear: {
      type: Function,
      default: undefined
    },
    onMouseDown: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      mouseHovered: false
    }
  },
  watch: {
    clearable (value) {
      if (!value) {
        this.mouseHovered = false
      }
    },
    show (value) {
      if (!value) {
        this.mouseHovered = false
      }
    }
  },
  methods: {
    handleClick (e) {
      const { onClear } = this
      if (onClear) onClear(e)
    },
    handleMouseEnter () {
      this.mouseHovered = true
    },
    handleMouseLeave () {
      this.mouseHovered = false
    },
    handleMouseDown (e) {
      e.preventDefault()
      const { onMouseDown } = this
      if (onMouseDown) onMouseDown(e)
    }
  }
}
</script>
