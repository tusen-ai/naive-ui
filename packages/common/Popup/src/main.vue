<template>
  <div
    v-click-outside="handleClickOut"
    class="n-popup"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="reference"
      class="n-popup__ref"
      @click="handleClickRef"
    >
      <slot />
    </div>
    <transition name="n-poup__fade">
      <div
        v-show="visible"
        ref="popper"
        v-transfer-dom
        :data-transfer="transfer"
        :style="style"
        class="popper n-popup__content-wrapper"
        @click="handleContentClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div
          v-if="arrow"
          class="n-popup__arrow"
        />
        <div
          class="n-popup__content"
          :style="{
            'max-width': width + 'px',
          }"
          :class="{
            'n-popup--word_wrap': width ? true : false
          }"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from '../../../utils/popper.js'
import { directive as clickOutside } from 'v-click-outside-x'
import TransferDom from '../../../directives/transfer-dom'

export default {
  name: 'NPopup',
  directives: { clickOutside, TransferDom },
  mixins: [Popper],
  props: {
    value: {
      default: false,
      type: Boolean
    },
    placement: {
      validator (value) {
        return [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ].includes(value)
      },
      default: 'bottom'
    },
    transfer: {
      default: true,
      type: Boolean
    },
    width: {
      default: null,
      type: Number
    },
    trigger: {
      validator (value) {
        return ['click', 'hover'].includes(value)
      },
      default: 'hover'
    },
    arrow: {
      default: true,
      type: Boolean
    },
    zIndex: {
      default: 1000,
      type: Number
    },
    padding: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      timerId: null,
      leaveTimer: null
    }
  },
  computed: {
    style () {
      let style = {}
      if (this.transfer) style['z-index'] = this.zIndex
      if (this.padding) style['padding'] = this.padding
      return style
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  },
  methods: {
    handleClickRef () {
      if (this.trigger === 'click') {
        this.show()
      }
    },
    handleContentClick (e) {
      if (this.transfer) {
        e.stopPropagation()
      }
    },
    handleClickOut () {
      if (this.trigger !== 'click') {
        return
      }
      this.hide()
    },
    hide () {
      if (this.timerId) {
        clearTimeout(this.timerId)
        this.timerId = setTimeout(() => {
          this.visible = false
          this.$emit('input', this.visible)
        }, 100)
      }
    },
    show () {
      if (this.timerId) {
        clearTimeout(this.timerId)
      }
      this.timerId = setTimeout(() => {
        this.visible = true
        this.$emit('input', this.visible)
      }, 100)
    },
    handleMouseEnter () {
      if (this.trigger === 'hover') this.show()
    },
    handleMouseLeave () {
      if (this.trigger === 'hover') this.hide()
    }
  }
}
</script>
