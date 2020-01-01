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
    @mouseenter="handleMouseEnterWrapper"
    @mouseleave="handleMouseLeaveWrapper"
    @dragstart.capture="handleDragStart"
  >
    <div
      v-if="!container"
      ref="scrollContainer"
      class="n-scrollbar-container"
      :style="containerStyle"
      @scroll="handleScroll"
    >
      <div
        ref="scrollContent"
        :style="contentStyle"
        class="n-scrollbar-content"
      >
        <slot />
      </div>
    </div>
    <template v-else>
      <slot />
    </template>
    <div
      v-if="showRail"
      ref="verticalRail"
      class="n-scrollbar-rail n-scrollbar-rail--vertical"
      :style="{...horizontalRailStyle, width: scrollbarSize }"
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
      v-if="showRail"
      ref="horizontalRail"
      class="n-scrollbar-rail n-scrollbar-rail--horizontal"
      :style="{ ...verticalRailStyle, height: scrollbarSize }"
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
    },
    container: {
      type: Function,
      default: null
    },
    content: {
      type: Function,
      default: null
    },
    contentStyle: {
      type: Object,
      default: null
    },
    containerStyle: {
      type: Object,
      default: null
    },
    horizontalRailStyle: {
      type: Object,
      default: null
    },
    verticalRailStyle: {
      type: Object,
      default: null
    },
    showRail: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      contentHeight: null,
      contentWidth: null,
      containerHeight: null,
      containerWidth: null,
      verticalRailHeight: null,
      horizontalRailWidth: null,
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
      if (this.containerHeight === null || this.contentHeight === null || this.verticalRailHeight === null) return 0
      else {
        return (this.verticalRailHeight * this.containerHeight / this.contentHeight + this.width * 1.5)
      }
    },
    verticalScrollbarHeightPx () {
      return this.verticalScrollbarHeight + 'px'
    },
    horizontalScrollbarWidth () {
      if (this.containerWidth === null || this.contentWidth === null || this.horizontalRailWidth === null) return 0
      else {
        return (this.horizontalRailWidth * this.containerWidth / this.contentWidth + this.width * 1.5)
      }
    },
    horizontalScrollbarWidthPx () {
      return this.horizontalScrollbarWidth + 'px'
    },
    verticalScrollbarTop () {
      if (this.containerHeight === null || this.containerScrollTop === null || this.contentHeight === null || this.verticalRailHeight === null) return 0
      else {
        return this.containerScrollTop / (this.contentHeight - this.containerHeight) * (this.verticalRailHeight - this.verticalScrollbarHeight)
      }
    },
    verticalScrollbarTopPx () {
      return this.verticalScrollbarTop + 'px'
    },
    horizontalScrollbarLeft () {
      if (this.containerWidth === null || this.containerScrollLeft === null || this.contentWidth === null) return 0
      else {
        return this.containerScrollLeft / (this.contentWidth - this.containerWidth) * (this.horizontalRailWidth - this.horizontalScrollbarWidth)
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
    resizeObserverDelagate.unregisterHandler(this._content())
  },
  destroyed () {
    window.clearTimeout(this.horizontalScrollbarVanishTimerId)
    window.clearTimeout(this.verticalScrollbarVanishTimerId)
    window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
    window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
  },
  mounted () {
    this.updateParameters()
    this.$nextTick().then(() => {
      if (this.container) {
        const containerEl = this.container()
        containerEl.addEventListener('scroll', this.handleScroll)
      }
    })
    resizeObserverDelagate.registerHandler(this._content(), this.updateParameters)
  },
  methods: {
    _container () {
      if (this.container) {
        return this.container()
      }
      return this.$refs.scrollContainer
    },
    _content () {
      if (this.content) {
        return this.content()
      }
      return this.$refs.scrollContent
    },
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
    scrollToTop (smooth = false) {
      if (this._container()) {
        this._container().scrollTo({
          top: 0
        })
      }
    },
    scrollToBottom (smooth = false) {
      if (this._container()) {
        this._container().scrollTo({
          top: this._content().offsetHeight
        })
      }
    },
    scrollToElement (el) {
      if (this.withoutScrollbar) return
      if (el.offsetTop < this._container().scrollTop) {
        this._container().scrollTo({
          top: el.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      } else if (el.offsetTop + el.offsetHeight > this._container().scrollTop + this._container().offsetHeight) {
        this._container().scrollTo({
          top: el.offsetTop + el.offsetHeight - this._container().offsetHeight,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    handleMouseEnterWrapper () {
      this.$emit('mouse-enter')
      if (this.disabled) return
      this.displayHorizontalScrollbar()
      this.displayVerticalScrollbar()
      this.updateParameters()
    },
    handleMouseLeaveWrapper () {
      this.$emit('mouse-leave')
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
      this.$emit('scroll', e, this._container(), this._content())
      this.updateScrollParameters()
    },
    updateScrollParameters () {
      if (this._container()) {
        this.containerScrollTop = this._container().scrollTop
        this.containerScrollLeft = this._container().scrollLeft
      }
    },
    updatePositionParameters () {
      /**
       * Don't use getClientBoundingRect because element may be scale transformed
       */
      if (this._content()) {
        this.contentHeight = this._content().offsetHeight
        this.contentWidth = this._content().offsetWidth
      }
      if (this._container()) {
        this.containerHeight = this._container().offsetHeight
        this.containerWidth = this._container().offsetWidth
      }
      if (this.$refs.horizontalRail) {
        this.horizontalRailWidth = this.$refs.horizontalRail.offsetWidth
      }
      if (this.$refs.verticalRail) {
        this.verticalRailHeight = this.$refs.verticalRail.offsetHeight
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
        window.clearTimeout(this.horizontalScrollbarVanishTimerId)
        window.clearTimeout(this.verticalScrollbarVanishTimerId)
        const dX = (e.clientX - this.memorizedMouseX)
        let dScrollLeft = dX * (this.contentWidth - this.containerWidth) / (this.containerWidth - this.horizontalScrollbarWidth)
        const toScrollLeftUpperBound = this.contentWidth - this.containerWidth
        let toScrollLeft = this.memorizedHorizontalLeft + dScrollLeft
        toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
        toScrollLeft = Math.max(toScrollLeft, 0)
        this._container().scrollLeft = toScrollLeft
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
        this._container().scrollTop = toScrollTop
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
