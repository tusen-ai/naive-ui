<template>
  <slot v-if="!scrollable" />
  <v-resize-observer
    v-else
    @resize="handleContentResize"
  >
    <div
      v-bind="$attrs"
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
            :style="[
              contentStyle,
              {
                width: xScrollable ? 'fit-content' : null,
              }
            ]"
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
        ref="yRailRef"
        class="n-scrollbar-rail n-scrollbar-rail--vertical"
        :class="{
          'n-scrollbar-rail--disabled': !needyBar
        }"
        :style="[
          horizontalRailStyle,
          { width: sizePx }
        ]"
      >
        <transition name="n-fade-in-transition">
          <div
            v-if="needyBar && isShowYBar && !isIos"
            class="n-scrollbar-rail__scrollbar"
            :style="{
              height: yBarSizePx,
              top: yBarTopPx,
              width: sizePx,
              borderRadius: scrollbarBorderRadius
            }"
            @mousedown="handleYScrollMouseDown"
            @mouseup="handleYScrollMouseUp"
            @mousemove="handleYScrollMouseMove"
          />
        </transition>
      </div>
      <div
        ref="xRailRef"
        class="n-scrollbar-rail n-scrollbar-rail--horizontal"
        :class="{
          'n-scrollbar-rail--disabled': !needxBar
        }"
        :style="{ ...verticalRailStyle, height: sizePx }"
      >
        <transition name="n-fade-in-transition">
          <div
            v-if="needxBar && isShowXBar && !isIos"
            class="n-scrollbar-rail__scrollbar"
            :style="{
              height: sizePx,
              width: xBarSizePx,
              left: xBarLeftPx,
              borderRadius: scrollbarBorderRadius
            }"
            @mousedown="handleXScrollMouseDown"
            @mouseup="handleXScrollMouseUp"
            @mousemove="handleXScrollMouseMove"
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
  withCssr
} from '../../_mixins'
import styles from './styles/index.js'
import { useIsIos } from 'vooks'

export default {
  name: 'Scrollbar',
  components: {
    VResizeObserver
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  props: {
    size: {
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
      default: undefined
    },
    content: {
      type: Function,
      default: undefined
    },
    containerStyle: {
      type: Object,
      default: undefined
    },
    contentStyle: {
      type: Object,
      default: undefined
    },
    horizontalRailStyle: {
      type: Object,
      default: undefined
    },
    verticalRailStyle: {
      type: Object,
      default: undefined
    },
    onScroll: {
      type: Function,
      default: undefined
    }
  },
  setup () {
    return {
      containerRef: ref(null),
      contentRef: ref(null),
      yRailRef: ref(null),
      xRailRef: ref(null)
    }
  },
  data () {
    return {
      contentHeight: null,
      contentWidth: null,
      containerHeight: null,
      containerWidth: null,
      yRailSize: null,
      xRailWidth: null,
      containerScrollTop: null,
      containerScrollLeft: null,
      xBarVanishTimerId: null,
      yBarVanishTimerId: null,
      isShowXBar: false,
      isShowYBar: false,
      yBarPressed: false,
      xBarPressed: false,
      memoYTop: null,
      memoXLeft: null,
      memoMouseX: null,
      memoMouseY: null,
      isIos: useIsIos()
    }
  },
  computed: {
    yBarSize () {
      if (this.containerHeight === null || this.contentHeight === null || this.yRailSize === null) return 0
      else {
        return Math.min(this.containerHeight, (this.yRailSize * this.containerHeight / this.contentHeight + this.size * 1.5))
      }
    },
    yBarSizePx () {
      return this.yBarSize + 'px'
    },
    xBarSize () {
      if (this.containerWidth === null || this.contentWidth === null || this.xRailSize === null) return 0
      else {
        return (this.xRailSize * this.containerWidth / this.contentWidth + this.size * 1.5)
      }
    },
    xBarSizePx () {
      return this.xBarSize + 'px'
    },
    yBarTop () {
      if (this.containerHeight === null || this.containerScrollTop === null || this.contentHeight === null || this.yRailSize === null) return 0
      else {
        return this.containerScrollTop / (this.contentHeight - this.containerHeight) * (this.yRailSize - this.yBarSize)
      }
    },
    yBarTopPx () {
      return this.yBarTop + 'px'
    },
    xBarLeft () {
      if (this.containerWidth === null || this.containerScrollLeft === null || this.contentWidth === null) return 0
      else {
        return this.containerScrollLeft / (this.contentWidth - this.containerWidth) * (this.xRailSize - this.xBarSize)
      }
    },
    xBarLeftPx () {
      return this.xBarLeft + 'px'
    },
    sizePx () {
      return this.size + 'px'
    },
    scrollbarBorderRadius () {
      return this.size / 2 + 'px'
    },
    needyBar () {
      return this.containerHeight !== null && this.contentHeight !== null && this.contentHeight > this.containerHeight
    },
    needxBar () {
      return this.containerWidth !== null && this.contentWidth !== null && this.contentWidth > this.containerWidth
    }
  },
  beforeUnmount () {
    window.clearTimeout(this.xBarVanishTimerId)
    window.clearTimeout(this.yBarVanishTimerId)
    window.removeEventListener('mousemove', this.handleYScrollMouseMove, true)
    window.removeEventListener('mouseup', this.handleYScrollMouseUp, true)
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
    scrollTo (options, y) {
      if (!this.scrollable) return
      if (typeof options === 'number') this.scrollToPosition(options, y, 0, false, 'auto')
      const {
        left,
        top,
        index,
        elSize,
        position,
        behavior,
        el,
        debounce = true
      } = options
      if (left !== undefined || top !== undefined) {
        this.scrollToPosition(left, top, 0, false, behavior)
      } if (el !== undefined) {
        this.scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior)
      } else if (index !== undefined && elSize !== undefined) {
        this.scrollToPosition(0, index * elSize, behavior, debounce, behavior)
      } else if (position === 'bottom') {
        this.scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior)
      } else if (position === 'top') {
        this.scrollToPosition(0, 0, 0, false, behavior)
      }
    },
    scrollToPosition (
      left,
      top,
      elSize,
      debounce,
      behavior
    ) {
      const container = this.mergedContainerRef()
      if (!container) return
      if (debounce) {
        const {
          scrollTop,
          offsetHeight
        } = container
        if (top > scrollTop) {
          if (top + elSize <= scrollTop + offsetHeight) {
            // do nothing
          } else {
            container.scrollTo({
              left,
              top: top + elSize - offsetHeight,
              behavior
            })
          }
          return
        }
      }
      container.scrollTo({
        left,
        top,
        behavior
      })
    },
    handleMouseEnterWrapper () {
      this.showXBar()
      this.showYBar()
      this.sync()
    },
    handleMouseLeaveWrapper () {
      this.hideBar()
    },
    hideBar () {
      this.hideYBar()
      this.hideXBar()
    },
    hideYBar () {
      if (this.yBarVanishTimerId !== null) {
        window.clearTimeout(this.yBarVanishTimerId)
      }
      this.yBarVanishTimerId = window.setTimeout(() => {
        this.isShowYBar = false
      }, this.duration)
    },
    hideXBar () {
      if (this.xBarVanishTimerId !== null) {
        window.clearTimeout(this.xBarVanishTimerId)
      }
      this.xBarVanishTimerId = window.setTimeout(() => {
        this.isShowXBar = false
      }, this.duration)
    },
    showXBar () {
      if (this.xBarVanishTimerId !== null) {
        window.clearTimeout(this.xBarVanishTimerId)
      }
      this.isShowXBar = true
    },
    showYBar () {
      if (this.yBarVanishTimerId !== null) {
        window.clearTimeout(this.yBarVanishTimerId)
      }
      this.isShowYBar = true
    },
    handleScroll (e) {
      const {
        onScroll
      } = this
      if (onScroll) onScroll(e)
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
      const { xRailRef, yRailRef } = this
      if (xRailRef) {
        this.xRailSize = xRailRef.offsetWidth
      }
      if (yRailRef) {
        this.yRailSize = yRailRef.offsetHeight
      }
    },
    sync () {
      if (!this.scrollable) return
      this.syncPositionState()
      this.syncScrollState()
    },
    handleXScrollMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.xBarPressed = true
      window.addEventListener('mousemove', this.handleXScrollMouseMove)
      window.addEventListener('mouseup', this.handleXScrollMouseUp)
      this.memoXLeft = this.containerScrollLeft
      this.memoMouseX = e.clientX
    },
    handleXScrollMouseMove (e) {
      if (!this.xBarPressed) return
      window.clearTimeout(this.xBarVanishTimerId)
      window.clearTimeout(this.yBarVanishTimerId)
      const dX = (e.clientX - this.memoMouseX)
      const dScrollLeft = dX * (this.contentWidth - this.containerWidth) / (this.containerWidth - this.xBarSize)
      const toScrollLeftUpperBound = this.contentWidth - this.containerWidth
      let toScrollLeft = this.memoXLeft + dScrollLeft
      toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft)
      toScrollLeft = Math.max(toScrollLeft, 0)
      this.mergedContainerRef().scrollLeft = toScrollLeft
    },
    handleXScrollMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      window.removeEventListener('mousemove', this.handleXScrollMouseMove)
      window.removeEventListener('mouseup', this.handleXScrollMouseUp)
      this.xBarPressed = false
      this.sync()
      if (!this.mergedContainerRef().contains(e.target)) {
        this.hideBar()
      }
    },
    handleYScrollMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.yBarPressed = true
      window.addEventListener('mousemove', this.handleYScrollMouseMove, true)
      window.addEventListener('mouseup', this.handleYScrollMouseUp, true)
      this.memoYTop = this.containerScrollTop
      this.memoMouseY = e.clientY
    },
    handleYScrollMouseMove (e) {
      if (!this.yBarPressed) return
      window.clearTimeout(this.xBarVanishTimerId)
      window.clearTimeout(this.yBarVanishTimerId)
      const dY = (e.clientY - this.memoMouseY)
      const dScrollTop = dY * (this.contentHeight - this.containerHeight) / (this.containerHeight - this.yBarSize)
      const toScrollTopUpperBound = this.contentHeight - this.containerHeight
      let toScrollTop = this.memoYTop + dScrollTop
      toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop)
      toScrollTop = Math.max(toScrollTop, 0)
      this.mergedContainerRef().scrollTop = toScrollTop
    },
    handleYScrollMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      const {
        onScrollEnd
      } = this
      if (onScrollEnd) onScrollEnd()
      window.removeEventListener('mousemove', this.handleYScrollMouseMove, true)
      window.removeEventListener('mouseup', this.handleYScrollMouseUp, true)
      this.yBarPressed = false
      this.sync()
      if (!this.mergedContainerRef().contains(e.target)) {
        this.hideBar()
      }
    }
  }
}
</script>
