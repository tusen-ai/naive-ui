<template>
  <div
    style="postion:relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-click-outside="handleClickOut"
  >
    <div ref="reference" @click="handleClickRef" style="position:relative;">
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        @click="handleContentClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        v-show="visible"
        :data-transfer="transfer"
        v-transfer-dom
        ref="popper"
        class="popper n-popup__content__wrapper"
      >
        <div class="n-popup-arrow" v-if="arrow"></div>
        <div
          class="n-popup__content"
          :style="{
            width: width + 'px',
            'box-sizing': 'border-box'
          }"
          :class="{
            'n-popup__word_wrap': width ? true : false
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
  mixins: [Popper],
  name: 'NPopup',
  directives: { clickOutside, TransferDom },
  props: {
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
    }
  },
  data () {
    return {
      timerId: null,
      leaveTimer: null
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
        }, 100)
      }
    },
    show () {
      if (this.timerId) {
        clearTimeout(this.timerId)
      }
      this.timerId = setTimeout(() => {
        this.visible = true
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
