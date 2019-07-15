<template>
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
      <slot name="activator" />
    </div>
    <div
      ref="content"
      class="n-popover__content-container"
    >
      <div
        ref="contentWrapper"
        class="n-popover__content-wrapper"
      >
        <transition
          name="n-popover-fade"
        >
          <div
            v-if="showPopover"
            ref="popoverBody"
            :n-placement="placement"
            class="n-popover__content"
            :class="{
              'n-popover__content--without-arrow': !arrow
            }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div
              v-if="arrow"
              class="n-popover__arrow"
            />
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import detachable from '../../../mixins/detachable'
import getParentNode from '../../../utils/getParentNode'
import getScrollParent from '../../../utils/getScrollParent'
import scrollHandler from './scrollHandler'
import resizeHandler from './resizeHandler'
import calcTransform from './calcTransform'

const DEFAULT_DURATION = 200

export default {
  name: 'NPopover',
  mixins: [detachable],
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [String, Number],
      default: DEFAULT_DURATION
    },
    trigger: {
      default: 'hover',
      validator (value) {
        return ['click', 'hover', 'manual'].includes(value)
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
          'bottom',
          'left',
          'right',
          'top-start',
          'top-end',
          'left-start',
          'left-end',
          'right-start',
          'right-end',
          'bottom-start',
          'bottom-end'
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
      privateShowPopover: false,
      id: Math.random().toString(16),
      vanishTimerId: null
    }
  },
  computed: {
    computedDuration () {
      const duration = Number(this.duration)
      if (Number.isNaN(duration)) {
        return DEFAULT_DURATION
      } else {
        return duration < 0 ? DEFAULT_DURATION : duration
      }
    },
    showPopover () {
      if (this.trigger === 'manual') {
        return this.active
      } else {
        return this.privateShowPopover
      }
    }
  },
  watch: {
    active () {
      this.$nextTick().then(this.updatePosition)
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.registerScrollListeners()
      this.registerResizeListener()
    })
  },
  beforeDestroy () {
    this.unregisterScrollListeners()
    this.unregisterResizeListener()
    window.removeEventListener('click', this.handleClickOutsidePopover)
  },
  methods: {
    registerResizeListener () {
      resizeHandler.registerHandler(this.updatePosition)
    },
    registerScrollListeners () {
      let currentElement = this.$refs.self
      while (true) {
        currentElement = getScrollParent(currentElement)
        this.scrollListeners.push([currentElement, this.updatePosition])
        currentElement = getParentNode(currentElement)
        if (currentElement === document.body || currentElement.nodeName === 'HTML') {
          break
        }
      }
      for (const [el, handler] of this.scrollListeners) {
        scrollHandler.registerHandler(el, handler)
      }
    },
    unregisterResizeListener () {
      resizeHandler.unregisterHandler(this.updatePosition)
    },
    unregisterScrollListeners () {
      for (const [el, handler] of this.scrollListeners) {
        scrollHandler.unregisterHandler(el, handler)
      }
      this.scrollListeners = []
    },
    updatePosition () {
      // console.log('scroll')
      if (!this.showPopover) return
      console.log(this.id)
      this.activatorBoundingClientRect = this.$refs.activator.getBoundingClientRect()
      // console.log(this.$refs.popoverBody)
      // debugger
      this.contentBoundingClientRect = this.$refs.contentWrapper.getBoundingClientRect()
      // console.log(this.contentBoundingClientRect)
      // debugger
      // console.log('scroll', this.activatorBoundingClientRect, this.contentBoundingClientRect)
      this.$refs.contentWrapper.style = calcTransform(this.placement, this.activatorBoundingClientRect, this.contentBoundingClientRect)
    },
    handleMouseEnter () {
      if (this.trigger === 'hover') {
        if (this.vanishTimerId) {
          window.clearTimeout(this.vanishTimerId)
          this.vanishTimerId = null
        }
        this.privateShowPopover = true
        /** only after popover dom has emerged can we update position */
        this.$nextTick().then(this.updatePosition)
      }
    },
    handleMouseLeave () {
      if (this.trigger === 'hover') {
        this.vanishTimerId = window.setTimeout(() => {
          this.privateShowPopover = false
        }, this.duration)
      }
    },
    handleClickOutsidePopover (e) {
      if (!this.$refs.activator.contains(e.target) && (this.$refs.popoverBody && !this.$refs.popoverBody.contains(e.target))) {
        this.privateShowPopover = false
        window.removeEventListener('click', this.handleClickOutsidePopover)
      }
    },
    handleActivatorClick () {
      if (this.trigger === 'click') {
        this.privateShowPopover = !this.privateShowPopover
        this.$nextTick().then(this.updatePosition)
        window.addEventListener('click',
          this.handleClickOutsidePopover
        )
      }
    }
  }
}
</script>
