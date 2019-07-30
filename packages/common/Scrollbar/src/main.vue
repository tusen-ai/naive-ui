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
      <div
        v-if="showVeriticalScrollbar"
        class="n-scrollbar-rail__scrollbar"
        :style="{
          height: verticalScrollbarHeightPx,
          top: verticalScrollbarTopPx,
          width: scrollbarSize
        }"
        @mousedown="handleVerticalScrollMouseDown"
        @mouseup="handleVerticalScrollMouseUp"
        @mousemove="handleVerticalScrollMouseMove"
      />
    </div>
    <div
      class="n-scrollbar-horizontal-rail"
      :style="{height: scrollbarSize}"
    >
      <div
        v-if="showHorizontalScrollbar"
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
      default: 1000
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
    this.$el.parentElement.style.position = 'relative'
    this.$el.parentElement.style.overflow = 'hidden'
    this.$el.parentElement.classList.add('n-scrollbar-wrapper')
    this.updateParameters()
  },
  methods: {
    enterScrollWrapper () {
      this.displayHorizontalScrollbar()
      this.displayVerticalScrollbar()
    },
    leaveScrollWrapper () {
      this.hiddenVerticalScrollbar()
      this.hiddenHorizontalScrollbar()
    },
    hiddenVerticalScrollbar () {
      if (this.verticalScrollbarVanishTimerId !== null) {
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
      }
      this.verticalScrollbarVanishTimerId = window.setTimeout(() => {
        this.showVeriticalScrollbar = false
      }, this.duration)
    },
    hiddenHorizontalScrollbar () {
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
      this.containerScrollTop = this.$refs.scrollContainer.scrollTop
      this.containerScrollLeft = this.$refs.scrollContainer.scrollLeft
    },
    updatePositionParameters () {
      const containerRect = this.$refs.scrollContainer.getBoundingClientRect()
      const contentRect = this.$refs.scrollContent.getBoundingClientRect()
      this.contentHeight = contentRect.height
      this.contentWidth = contentRect.width
      this.containerHeight = containerRect.height
      this.containerWidth = containerRect.width
    },
    updateParameters () {
      this.updatePositionParameters()
      this.updateScrollParameters()
    },
    handleHorizontalScrollMouseDown (e) {
      console.log('mousedown')
      this.horizontalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.addEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.memorizedHorizontalLeft = this.containerScrollLeft
      this.memorizedMouseX = e.clientX
    },
    handleHorizontalScrollMouseMove (e) {
      if (this.horizontalScrollbarActivated) {
        const dX = (e.clientX - this.memorizedMouseX)
        let dScrollLeft = dX * ((this.contentWidth - this.horizontalScrollbarWidth) * this.contentWidth) / (this.containerWidth * this.containerWidth)
        const toScrollLeftUpperBound = this.contentWidth - this.containerWidth
        let toScrollLeft = this.memorizedHorizontalLeft + dScrollLeft
        toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
        toScrollLeft = Math.max(toScrollLeft, 0)
        this.$refs.scrollContainer.scrollLeft = toScrollLeft
      }
    },
    handleHorizontalScrollMouseUp () {
      window.removeEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.removeEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.horizontalScrollbarActivated = false
      this.updateParameters()
      console.log('mouseup')
    },
    handleVerticalScrollMouseDown (e) {
      console.log('mousedown')
      this.verticalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleVerticalScrollMouseMove)
      window.addEventListener('mouseup', this.handleVerticalScrollMouseUp)
      this.memorizedVerticalTop = this.containerScrollTop
      this.memorizedMouseY = e.clientY
    },
    handleVerticalScrollMouseMove (e) {
      if (this.verticalScrollbarActivated) {
        const dY = (e.clientY - this.memorizedMouseY)
        let dScrollLeft = dY * ((this.contentHeight - this.verticalScrollbarHeight) * this.contentHeight) / (this.containerHeight * this.containerHeight)
        const toScrollTopUpperBound = this.contentHeight - this.containerHeight
        let toScrollTop = this.memorizedVerticalTop + dScrollLeft
        toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
        toScrollTop = Math.max(toScrollTop, 0)
        this.$refs.scrollContainer.scrollTop = toScrollTop
      }
    },
    handleVerticalScrollMouseUp () {
      window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove)
      window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp)
      this.verticalScrollbarActivated = false
      this.updateParameters()
      console.log('mouseup')
    },
    handleDragStart (e) {
      console.log('drag start')
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>

.n-scrollbar {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
}
.n-scrollbar-vertical-rail, .n-scrollbar-horizontal-rail {
  position: absolute;
  user-select: none;
  .n-scrollbar-rail__scrollbar {
    position: absolute;
    background-color: yellow;
  }
}

.n-scrollbar-horizontal-rail {
  left: 0;
  right: 0;
  bottom: 0;
  .n-scrollbar-rail__scrollbar {
    right: 0;
  }
}

.n-scrollbar-vertical-rail {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  .n-scrollbar-rail__scrollbar {
    bottom: 0;
  }
}

.n-scrollbar-container {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.n-scrollbar-content {
  width: fit-content;
  height: fit-content;
  overflow: visible;
}
</style>
