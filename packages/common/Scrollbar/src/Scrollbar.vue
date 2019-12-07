<template>
  <div v-if="withoutScrollbar" ref="scrollContent">
    <slot />
  </div>
  <div
    v-else
    class="n-scrollbar"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    @mouseenter="enterScrollWrapper"
    @mouseleave="leaveScrollWrapper"
    @dragstart.capture="handleDragStart"
  >
    <div
      ref="scrollContainer"
      class="n-scrollbar-container"
      @scroll="handleScroll"
    >
      <div
        ref="scrollContent"
        class="n-scrollbar-content"
      >
        <slot />
      </div>
    </div>
    <div
      class="n-scrollbar-vertical-rail"
      :style="{width: scrollbarSize}"
    >
      <transition name="n-scrollbar--transition">
        <div
          v-if="needVerticalScrollbar && showVeriticalScrollbar"
          class="n-scrollbar-rail__scrollbar"
          :style="{
            height: verticalScrollbarHeightPx,
            top: verticalScrollbarTopPx,
            width: scrollbarSize,
            borderRadius: scrollbarBorderRadius
          }"
          @mousedown="handleVerticalScrollMouseDown"
          @mouseup="handleVerticalScrollMouseUp"
          @mousemove="handleVerticalScrollMouseMove"
        />
      </transition>
    </div>
    <div
      class="n-scrollbar-horizontal-rail"
      :style="{height: scrollbarSize}"
    >
      <transition name="n-scrollbar--transition">
        <div
          v-if="needHorizontalScrollbar && showHorizontalScrollbar"
          class="n-scrollbar-rail__scrollbar"
          :style="{
            height: scrollbarSize,
            width: horizontalScrollbarWidthPx,
            left: horizontalScrollbarLeftPx,
            borderRadius: scrollbarBorderRadius
          }"
          @mousedown="handleHorizontalScrollMouseDown"
          @mouseup="handleHorizontalScrollMouseUp"
          @mousemove="handleHorizontalScrollMouseMove"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themable from '../../../mixins/themeable'
import resizeObserverDelagate from '../../../utils/delegate/resizeObserverDelegate'

export default {
  name: 'NScrollbar',
  mixins: [withapp, themable],
  props: {
    width: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
    },
    withoutScrollbar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      contentHeight: null,
      contentWidth: null,
      containerHeight: null,
      containerWidth: null,
      containerScrollTop: null,
      containerScrollLeft: null,
      horizontalScrollbarVanishTimerId: null,
      verticalScrollbarVanishTimerId: null,
      showHorizontalScrollbar: false,
      showVeriticalScrollbar: false,
      verticalScrollbarActivated: false,
      horizontalScrollbarActivated: false,
      memorizedVerticalTop: null,
      memorizedHorizontalLeft: null,
      memorizedMouseX: null,
      memorizedMouseY: null,
      disabled: false
    }
  },
  computed: {
    verticalScrollbarHeight () {
      if (this.containerHeight === null || this.contentHeight === null) return 0
      else {
        return (this.containerHeight * this.containerHeight / this.contentHeight + this.width * 1.5)
      }
    },
    verticalScrollbarHeightPx () {
      return this.verticalScrollbarHeight + 'px'
    },
    horizontalScrollbarWidth () {
      if (this.containerWidth === null || this.contentWidth === null) return 0
      else {
        return (this.containerWidth * this.containerWidth / this.contentWidth + this.width * 1.5)
      }
    },
    horizontalScrollbarWidthPx () {
      return this.horizontalScrollbarWidth + 'px'
    },
    verticalScrollbarTop () {
      if (this.containerHeight === null || this.containerScrollTop === null || this.contentHeight === null) return 0
      else {
        return this.containerScrollTop / (this.contentHeight - this.containerHeight) * (this.containerHeight - this.verticalScrollbarHeight)
      }
    },
    verticalScrollbarTopPx () {
      return this.verticalScrollbarTop + 'px'
    },
    horizontalScrollbarLeft () {
      if (this.containerWidth === null || this.containerScrollLeft === null || this.contentWidth === null) return 0
      else {
        return this.containerScrollLeft / (this.contentWidth - this.containerWidth) * (this.containerWidth - this.horizontalScrollbarWidth)
      }
    },
    horizontalScrollbarLeftPx () {
      return this.horizontalScrollbarLeft + 'px'
    },
    scrollbarSize () {
      return this.width + 'px'
    },
    scrollbarBorderRadius () {
      return this.width / 2 + 'px'
    },
    needVerticalScrollbar () {
      return this.containerHeight !== null && this.contentHeight !== null && this.contentHeight > this.containerHeight
    },
    needHorizontalScrollbar () {
      return this.containerWidth !== null && this.contentWidth !== null && this.contentWidth > this.containerWidth
    }
  },
  watch: {
    '$refs.scrollContent': function () {
      throw Error('n-scrollbar\'s content ref changed, which is not expected')
    },
    containerScrollTop () {
      this.handleVerticalScroll()
    },
    containerScrollLeft () {
      this.handleHorizontalScroll()
    }
  },
  updated () {
    // console.log('[NScrollbar.updated]')
  },
  beforeDestroy () {
    resizeObserverDelagate.unregisterHandler(this.$refs.scrollContent)
  },
  destroyed () {
    window.clearTimeout(this.horizontalScrollbarVanishTimerId)
    window.clearTimeout(this.verticalScrollbarVanishTimerId)
    window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
    window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
  },
  mounted () {
    this.updateParameters()
    resizeObserverDelagate.registerHandler(this.$refs.scrollContent, this.updateParameters)
  },
  methods: {
    disableScrollbar () {
      this.hideScrollbar()
      this.disabled = true
    },
    enableScrollbar () {
      this.disabled = false
      this.updateParameters()
      this.showScrollbar()
    },
    showScrollbar () {
      this.showHorizontalScrollbar = true
      this.showVeriticalScrollbar = true
    },
    scrollToElement (el) {
      if (el.offsetTop < this.$refs.scrollContainer.scrollTop) {
        this.$refs.scrollContainer.scrollTo({
          top: el.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      } else if (el.offsetTop + el.offsetHeight > this.$refs.scrollContainer.scrollTop + this.$refs.scrollContainer.offsetHeight) {
        this.$refs.scrollContainer.scrollTo({
          top: el.offsetTop + el.offsetHeight - this.$refs.scrollContainer.offsetHeight,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    enterScrollWrapper () {
      if (this.disabled) return
      this.displayHorizontalScrollbar()
      this.displayVerticalScrollbar()
      this.updateParameters()
    },
    leaveScrollWrapper () {
      if (this.disabled) return
      this.hideScrollbar()
    },
    hideScrollbar () {
      this.hideVerticalScrollbar()
      this.hideHorizontalScrollbar()
    },
    hideVerticalScrollbar () {
      if (this.verticalScrollbarVanishTimerId !== null) {
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
      }
      this.verticalScrollbarVanishTimerId = window.setTimeout(() => {
        this.showVeriticalScrollbar = false
      }, this.duration)
    },
    hideHorizontalScrollbar () {
      if (this.horizontalScrollbarVanishTimerId !== null) {
        window.clearTimeout(this.horizontalScrollbarVanishTimerId)
      }
      this.horizontalScrollbarVanishTimerId = window.setTimeout(() => {
        this.showHorizontalScrollbar = false
      }, this.duration)
    },
    displayHorizontalScrollbar () {
      if (this.horizontalScrollbarVanishTimerId !== null) {
        window.clearTimeout(this.horizontalScrollbarVanishTimerId)
      }
      this.showHorizontalScrollbar = true
    },
    displayVerticalScrollbar () {
      if (this.verticalScrollbarVanishTimerId !== null) {
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
      }
      this.showVeriticalScrollbar = true
    },
    handleHorizontalScroll () {
      // console.log('handleHorizontalScroll')
    },
    handleVerticalScroll () {
      // console.log('handleVerticalScroll')
    },
    handleScroll (e) {
      if (this.disabled) return
      this.$emit('scroll', e, this.$refs.scrollContainer, this.$refs.scrollContent)
      this.updateScrollParameters()
    },
    updateScrollParameters () {
      if (this.$refs.scrollContainer) {
        this.containerScrollTop = this.$refs.scrollContainer.scrollTop
        this.containerScrollLeft = this.$refs.scrollContainer.scrollLeft
      }
    },
    updatePositionParameters () {
      /**
       * Don't use getClientBoundingRect because element may be scale transformed
       */
      if (this.$refs.scrollContent) {
        this.contentHeight = this.$refs.scrollContent.offsetHeight
        this.contentWidth = this.$refs.scrollContent.offsetWidth
      }
      if (this.$refs.scrollContainer) {
        this.containerHeight = this.$refs.scrollContainer.offsetHeight
        this.containerWidth = this.$refs.scrollContainer.offsetWidth
      }
    },
    updateParameters () {
      this.updatePositionParameters()
      this.updateScrollParameters()
    },
    handleHorizontalScrollMouseDown (e) {
      this.$emit('scrollstart')
      this.horizontalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.addEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.memorizedHorizontalLeft = this.containerScrollLeft
      this.memorizedMouseX = e.clientX
    },
    handleHorizontalScrollMouseMove (e) {
      if (this.horizontalScrollbarActivated) {
        console.log('here')
        window.clearTimeout(this.horizontalScrollbarVanishTimerId)
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
        const dX = (e.clientX - this.memorizedMouseX)
        let dScrollLeft = dX * (this.contentWidth - this.containerWidth) / (this.containerWidth - this.horizontalScrollbarWidth)
        const toScrollLeftUpperBound = this.contentWidth - this.containerWidth
        let toScrollLeft = this.memorizedHorizontalLeft + dScrollLeft
        toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
        toScrollLeft = Math.max(toScrollLeft, 0)
        this.$refs.scrollContainer.scrollLeft = toScrollLeft
      }
    },
    handleHorizontalScrollMouseUp (e) {
      this.$emit('scrollend')
      window.removeEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.removeEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.horizontalScrollbarActivated = false
      this.updateParameters()
      if (!this.$el.contains(e.target)) {
        this.hideScrollbar()
      }
    },
    handleVerticalScrollMouseDown (e) {
      this.$emit('scrollstart')
      this.verticalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
      window.addEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
      this.memorizedVerticalTop = this.containerScrollTop
      this.memorizedMouseY = e.clientY
    },
    handleVerticalScrollMouseMove (e) {
      if (this.verticalScrollbarActivated) {
        window.clearTimeout(this.horizontalScrollbarVanishTimerId)
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
        const dY = (e.clientY - this.memorizedMouseY)
        let dScrollTop = dY * (this.contentHeight - this.containerHeight) / (this.containerHeight - this.verticalScrollbarHeight)
        const toScrollTopUpperBound = this.contentHeight - this.containerHeight
        let toScrollTop = this.memorizedVerticalTop + dScrollTop
        toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
        toScrollTop = Math.max(toScrollTop, 0)
        this.$refs.scrollContainer.scrollTop = toScrollTop
      }
    },
    handleVerticalScrollMouseUp (e) {
      this.$emit('scrollend')
      window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
      window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
      this.verticalScrollbarActivated = false
      this.updateParameters()
      if (!this.$el.contains(e.target)) {
        this.hideScrollbar()
      }
    },
    handleDragStart (e) {
      // e.preventDefault()
      // for n-tree component to work...
    }
  }
}
</script>
