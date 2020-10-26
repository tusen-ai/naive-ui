<template>
  <slot v-if="!scrollable" />
  <v-resize-observer
    v-else
    @resize="handleContentResize"
  >
    <div
      class="n-scrollbar"
      :class="{
        [`n-${mergedTheme}-theme`]: mergedTheme
      }"
      @mouseenter="handleMouseEnterWrapper"
      @mouseleave="handleMouseLeaveWrapper"
    >
      <div
        v-if="!container"
        ref="containerRef"
        class="n-scrollbar-container"
        :style="containerStyle"
        @scroll="handleScroll"
      >
        <v-resize-observer @resize="handleContentResize">
          <div
            ref="contentRef"
            :style="{
              width: xScrollable ? 'fit-content' : null,
              ...contentStyle,
            }"
            class="n-scrollbar-content"
          >
            <slot />
          </div>
        </v-resize-observer>
      </div>
      <template v-else>
        <slot />
      </template>
      <div
        ref="verticalRailRef"
        class="n-scrollbar-rail n-scrollbar-rail--vertical"
        :class="{
          'n-scrollbar-rail--disabled': !needVerticalScrollbar
        }"
        :style="{...horizontalRailStyle, width: scrollbarSize }"
      >
        <transition name="n-fade-in-transition">
          <div
            v-if="needVerticalScrollbar && showVeriticalScrollbar && !isIos"
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
        ref="horizontalRailRef"
        class="n-scrollbar-rail n-scrollbar-rail--horizontal"
        :class="{
          'n-scrollbar-rail--disabled': !needHorizontalScrollbar
        }"
        :style="{ ...verticalRailStyle, height: scrollbarSize }"
      >
        <transition name="n-fade-in-transition">
          <div
            v-if="needHorizontalScrollbar && showHorizontalScrollbar && !isIos"
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
  </v-resize-observer>
</template>

<script>
import {
  ref
} from 'vue'
import {
  VResizeObserver
} from 'vueuc'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles/index.js'
import { isIos } from '../../_utils'

export default {
  name: 'Scrollbar',
  components: {
    VResizeObserver
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    width: {
      type: Number,
      default: 5
    },
    duration: {
      type: Number,
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    xScrollable: {
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
    containerStyle: {
      type: Object,
      default: null
    },
    contentStyle: {
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
    onScroll: {
      type: Function,
      default: undefined
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
      isIos
    }
  },
  computed: {
    verticalScrollbarHeight () {
      if (this.containerHeight === null || this.contentHeight === null || this.verticalRailHeight === null) return 0
      else {
        return Math.min(this.containerHeight, (this.verticalRailHeight * this.containerHeight / this.contentHeight + this.width * 1.5))
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
  beforeUnmount () {
    window.clearTimeout(this.horizontalScrollbarVanishTimerId)
    window.clearTimeout(this.verticalScrollbarVanishTimerId)
    window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
    window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
  },
  setup () {
    return {
      containerRef: ref(null),
      contentRef: ref(null),
      verticalRailRef: ref(null),
      horizontalRailRef: ref(null)
    }
  },
  mounted () {
    // if container exist, it always can't be resolved when scrollbar is mounted
    // for example:
    // - component
    //   - scrollbar
    //     - inner
    // if you pass inner to scrollbar, you may use a ref inside component
    // however, when scrollbar is mounted, ref is not ready at component
    // you need to init by yourself
    if (this.container) return
    this.sync()
  },
  methods: {
    mergedContainerRef () {
      const {
        container
      } = this
      if (container) return container()
      return this.containerRef
    },
    mergedContentRef () {
      const {
        content
      } = this
      if (content) return content()
      return this.contentRef
    },
    handleContentResize () {
      this.sync()
    },
    scrollTo (...args) {
      const container = this.mergedContainerRef()
      if (container) {
        container.scrollTo(...args)
      }
    },
    scrollToElement (el, options = {}) {
      if (!this.scrollable) return
      const {
        getTop = elm => elm.offsetTop,
        getHeight = elm => elm.offsetHeight,
        behavior = 'auto'
      } = options
      const top = getTop(el)
      const container = this.mergedContainerRef()
      if (top < container.scrollTop) {
        container.scrollTo({
          top,
          left: 0,
          behavior
        })
      } else {
        const elHeight = getHeight(el)
        const containerHeight = container.offsetHeight
        if (top + elHeight > container.scrollTop + containerHeight) {
          container.scrollTo({
            top: top + elHeight - containerHeight,
            left: 0,
            behavior
          })
        }
      }
    },
    handleMouseEnterWrapper () {
      this.displayHorizontalScrollbar()
      this.displayVerticalScrollbar()
      this.sync()
    },
    handleMouseLeaveWrapper () {
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
    handleScroll (e) {
      const {
        onScroll
      } = this
      if (onScroll) onScroll(e, this.mergedContainerRef(), this.mergedContentRef())
      this.syncScrollState()
    },
    syncScrollState () {
      // only collect scroll state, do not trigger any dom event
      const container = this.mergedContainerRef()
      if (container) {
        this.containerScrollTop = container.scrollTop
        this.containerScrollLeft = container.scrollLeft
      }
    },
    syncPositionState () {
      // only collect position state, do not trigger any dom event
      // Don't use getClientBoundingRect because element may be scale transformed
      const content = this.mergedContentRef()
      if (content) {
        this.contentHeight = content.offsetHeight
        this.contentWidth = content.offsetWidth
      }
      const container = this.mergedContainerRef()
      if (container) {
        this.containerHeight = container.offsetHeight
        this.containerWidth = container.offsetWidth
      }
      const horizontalRail = this.horizontalRailRef
      if (horizontalRail) {
        this.horizontalRailWidth = horizontalRail.offsetWidth
      }
      const verticalRail = this.verticalRailRef
      if (verticalRail) {
        this.verticalRailHeight = verticalRail.offsetHeight
      }
    },
    sync () {
      if (!this.scrollable) return
      this.syncPositionState()
      this.syncScrollState()
    },
    handleHorizontalScrollMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.horizontalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.addEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.memorizedHorizontalLeft = this.containerScrollLeft
      this.memorizedMouseX = e.clientX
    },
    handleHorizontalScrollMouseMove (e) {
      if (!this.horizontalScrollbarActivated) return
      window.clearTimeout(this.horizontalScrollbarVanishTimerId)
      window.clearTimeout(this.verticalScrollbarVanishTimerId)
      const dX = (e.clientX - this.memorizedMouseX)
      let dScrollLeft = dX * (this.contentWidth - this.containerWidth) / (this.containerWidth - this.horizontalScrollbarWidth)
      const toScrollLeftUpperBound = this.contentWidth - this.containerWidth
      let toScrollLeft = this.memorizedHorizontalLeft + dScrollLeft
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
      toScrollLeft = Math.max(toScrollLeft, 0)
      this.mergedContainerRef().scrollLeft = toScrollLeft
    },
    handleHorizontalScrollMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      window.removeEventListener('mousemove', this.handleHorizontalScrollMouseMove)
      window.removeEventListener('mouseup', this.handleHorizontalScrollMouseUp)
      this.horizontalScrollbarActivated = false
      this.sync()
      if (!this.mergedContainerRef().contains(e.target)) {
        this.hideScrollbar()
      }
    },
    handleVerticalScrollMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.verticalScrollbarActivated = true
      window.addEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
      window.addEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
      this.memorizedVerticalTop = this.containerScrollTop
      this.memorizedMouseY = e.clientY
    },
    handleVerticalScrollMouseMove (e) {
      if (!this.verticalScrollbarActivated) return
      window.clearTimeout(this.horizontalScrollbarVanishTimerId)
      window.clearTimeout(this.verticalScrollbarVanishTimerId)
      const dY = (e.clientY - this.memorizedMouseY)
      let dScrollTop = dY * (this.contentHeight - this.containerHeight) / (this.containerHeight - this.verticalScrollbarHeight)
      const toScrollTopUpperBound = this.contentHeight - this.containerHeight
      let toScrollTop = this.memorizedVerticalTop + dScrollTop
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
      toScrollTop = Math.max(toScrollTop, 0)
      this.mergedContainerRef().scrollTop = toScrollTop
    },
    handleVerticalScrollMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      const {
        onScrollEnd
      } = this
      if (onScrollEnd) onScrollEnd()
      window.removeEventListener('mousemove', this.handleVerticalScrollMouseMove, true)
      window.removeEventListener('mouseup', this.handleVerticalScrollMouseUp, true)
      this.verticalScrollbarActivated = false
      this.sync()
      if (!this.mergedContainerRef().contains(e.target)) {
        this.hideScrollbar()
      }
    }
  }
}
</script>
