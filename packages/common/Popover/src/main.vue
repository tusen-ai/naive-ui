<template>
  <!-- <div
    ref="popover"
    v-click-outside="handleClickOut"
    class="n-popover"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="reference"
      class="n-popover__ref"
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
        class="popper n-popover__content-wrapper"
        @click="handleContentClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div
          v-if="arrow"
          class="n-popover__arrow"
        />
        <div
          class="n-popover__content"
          :style="{
            'max-width': width + 'px',
          }"
          :class="{
            'n-popover--word_wrap': width ? true : false
          }"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div> -->
  <div
    ref="self"
    class="n-popover"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="activator"
      class="n-popover__activator"
      @click="handleActivatorClick"
    >
      <slot />
    </div>
    <!-- <transition
      name="n-poup__fade"
    > -->
    <div
      ref="content"
      class="popper n-popover__content-container"
      @click="handleContentClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div
        v-if="arrow"
        class="n-popover__arrow"
      />

      <div
        ref="popoverBody"
        class="n-popover__content-wrapper"
        :style="`position: absolute; left: 0; top: 0; transform: translateX(${contentLeft}px) translateY( ${contentTop}px)`"
      >
        <transition
          name="n-popover-fade"
        >
          <div
            v-if="showTooltip"
            class="n-popover__content"
          >
            <slot name="content" />
          </div>
        </transition>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import getParentNode from '../../../utils/getParentNode'
import getScrollParent from '../../../utils/getScrollParent'
// import Popper from '../../../utils/popper.js'
// import { directive as clickOutside } from 'v-click-outside-x'
// import TransferDom from '../../../directives/transfer-dom'

export default {
  name: 'NPopover',
  mixins: [detachable],
  props: {
    value: {
      default: false,
      type: Boolean
    },
    trigger: {
      default: 'hover',
      validator (value) {
        return ['click', 'hover'].includes(value)
      }
    },
    arrow: {
      default: true,
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
    }
  },
  data: function () {
    return {
      contentTop: 0,
      contentLeft: 0,
      scrollListeners: [],
      showTooltip: false
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.updatePosition()
      this.registerScrollListener()
    })
    // console.log(this.$refs.activator)
    // console.log(getScrollParent(this.$refs.popover))
  },
  beforeDestroy () {
    this.unregisterScrollListener()
  },
  methods: {
    registerScrollListener () {
      let currentElement = this.$refs.self
      while (true) {
        currentElement = getScrollParent(currentElement)
        this.scrollListeners.push([currentElement, this.updatePosition])
        currentElement = getParentNode(currentElement)
        if (currentElement === document.body || currentElement.nodeName === 'HTML') {
          break
        }
      }
      console.log(this.scrollListeners)
      for (const [el, handler] of this.scrollListeners) {
        el.addEventListener('scroll', handler)
      }
    },
    unregisterScrollListener () {
      for (const [el, handler] of this.scrollListeners) {
        el.removeEventListener('scroll', handler)
      }
      this.scrollListeners = []
    },
    updatePosition () {
      // console.log('scroll')
      this.activatorBoundingClientRect = this.$refs.activator.getBoundingClientRect()
      this.contentBoundingClientRect = this.$refs.popoverBody.getBoundingClientRect()
      // console.log('scroll', this.activatorBoundingClientRect, this.contentBoundingClientRect)
      this.contentTop = this.activatorBoundingClientRect.top + this.activatorBoundingClientRect.height
      this.contentLeft = this.activatorBoundingClientRect.left + this.activatorBoundingClientRect.width / 2 - this.contentBoundingClientRect.width / 2
    },
    handleMouseEnter () {
      if (this.trigger === 'hover') {
        this.showTooltip = true
        this.$nextTick().then(this.updatePosition)
      }
    },
    handleMouseLeave () {
      if (this.trigger === 'hover') {
        this.showTooltip = false
        this.$nextTick().then(this.updatePosition)
      }
    },
    handleContentClick () {

    },
    handleActivatorClick () {
      if (this.trigger === 'click') {
        this.showTooltip = !this.showTooltip
        this.$nextTick().then(this.updatePosition)
      }
    }
  }
}

// export default {
//   name: 'NPopup',
//   directives: { clickOutside, TransferDom },
//   mixins: [Popper],
//   props: {
//     value: {
//       default: false,
//       type: Boolean
//     },
//     placement: {
//       validator (value) {
//         return [
//           'top',
//           'top-start',
//           'top-end',
//           'bottom',
//           'bottom-start',
//           'bottom-end',
//           'left',
//           'left-start',
//           'left-end',
//           'right',
//           'right-start',
//           'right-end'
//         ].includes(value)
//       },
//       default: 'bottom'
//     },
//     transfer: {
//       default: true,
//       type: Boolean
//     },
//     width: {
//       default: null,
//       type: Number
//     },
//     trigger: {
//       validator (value) {
//         return ['click', 'hover'].includes(value)
//       },
//       default: 'hover'
//     },
//     arrow: {
//       default: true,
//       type: Boolean
//     },
//     zIndex: {
//       default: 1000,
//       type: Number
//     },
//     padding: {
//       type: String,
//       default: null
//     }
//   },
//   data () {
//     return {
//       timerId: null,
//       leaveTimer: null
//     }
//   },
//   computed: {
//     style () {
//       let style = {}
//       if (this.transfer) style['z-index'] = this.zIndex
//       if (this.padding) style['padding'] = this.padding
//       return style
//     }
//   },
//   watch: {
//     value (val) {
//       this.visible = val
//     }
//   },
//   methods: {
//     handleClickRef () {
//       if (this.trigger === 'click') {
//         this.show()
//       }
//     },
//     handleContentClick (e) {
//       if (this.transfer) {
//         e.stopPropagation()
//       }
//     },
//     handleClickOut () {
//       if (this.trigger !== 'click') {
//         return
//       }
//       this.hide()
//     },
//     hide () {
//       if (this.timerId) {
//         clearTimeout(this.timerId)
//         this.timerId = setTimeout(() => {
//           this.visible = false
//           this.$emit('input', this.visible)
//         }, 100)
//       }
//     },
//     show () {
//       if (this.timerId) {
//         clearTimeout(this.timerId)
//       }
//       this.timerId = setTimeout(() => {
//         this.visible = true
//         this.$emit('input', this.visible)
//       }, 100)
//     },
//     handleMouseEnter () {
//       if (this.trigger === 'hover') this.show()
//     },
//     handleMouseLeave () {
//       if (this.trigger === 'hover') this.hide()
//     }
//   }
// }
</script>
