<template>
  <div
    class="n-scrollbar"
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
            left: horizontalScrollbarLeftPx
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

export default {
  name: 'NScrollbar',
  props: {
    width: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
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
      memorizedMouseY: null
    }
  },
  computed: {
    verticalScrollbarHeight () {
      if (this.containerHeight === null || this.contentHeight === null) return 0
      else {
        return (this.containerHeight * this.containerHeight / this.contentHeight)
      }
    },
    verticalScrollbarHeightPx () {
      return this.verticalScrollbarHeight + 'px'
    },
    horizontalScrollbarWidth () {
      if (this.containerWidth === null || this.contentWidth === null) return 0
      else {
        return (this.containerWidth * this.containerWidth / this.contentWidth)
      }
    },
    horizontalScrollbarWidthPx () {
      return this.horizontalScrollbarWidth + 'px'
    },
    verticalScrollbarTop () {
      if (this.containerHeight === null || this.containerScrollTop === null || this.contentHeight === null) return 0
      else {
        return (this.containerHeight * this.containerScrollTop / this.contentHeight)
      }
    },
    verticalScrollbarTopPx () {
      return this.verticalScrollbarTop + 'px'
    },
    horizontalScrollbarLeft () {
      if (this.containerWidth === null || this.containerScrollLeft === null || this.contentWidth === null) return 0
      else {
        return (this.containerWidth * this.containerScrollLeft / this.contentWidth)
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
    containerScrollTop () {
      this.handleVerticalScroll()
    },
    containerScrollLeft () {
      this.handleHorizontalScroll()
    }
  },
  destroyed () {
    window.clearTimeout(this.horizontalScrollbarVanishTimerId)
    window.clearTimeout(this.verticalScrollbarVanishTimerId)
    window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove)
    window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp)
  },
  mounted () {
    this.updateParameters()
  },
  methods: {
    scrollToElement (el, elPosition = 'bottom') {
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
      this.displayHorizontalScrollbar()
      this.displayVerticalScrollbar()
      this.updateParameters()
    },
    leaveScrollWrapper () {
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
    handleScroll () {
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
      window.addEventListener('mousemove', this.handleVerticalScrollMouseMove)
      window.addEventListener('mouseup', this.handleVerticalScrollMouseUp)
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
      window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove)
      window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp)
      this.verticalScrollbarActivated = false
      this.updateParameters()
      if (!this.$el.contains(e.target)) {
        this.hideScrollbar()
      }
    },
    handleDragStart (e) {
      e.preventDefault()
    }
  }
}
</script>
