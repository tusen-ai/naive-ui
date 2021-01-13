<template>
  <div
    class="n-log"
    :style="{
      lineHeight: lineHeight,
      height: styleHeight,
      ...cssVars
    }"
    @wheel.passive="handleWheel"
  >
    <n-scrollbar
      ref="scrollbarRef"
      :unstable-theme="mergedTheme.peers.Scrollbar"
      :unstable-theme-overrides="mergedTheme.overrides.Scrollbar"
      @scroll="handleScroll"
    >
      <n-code
        :unstable-theme="mergedTheme.peers.Code"
        :unstable-theme-overrides="mergedTheme.overrides.Code"
      >
        <n-log-line
          v-for="(line, index) in mergedLines"
          :key="index"
          :line="line"
        />
      </n-code>
    </n-scrollbar>
    <transition name="n-fade-in-scale-up-transition">
      <n-log-loader v-if="loading" />
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { throttle } from 'lodash-es'
import { useTheme, useHljs } from '../../_mixins'
import { warn } from '../../_utils'
import { NScrollbar } from '../../scrollbar'
import { NCode } from '../../code'
import { logLight } from '../styles'
import NLogLoader from './LogLoader.vue'
import NLogLine from './LogLine.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Log',
  components: {
    NScrollbar,
    NCode,
    NLogLoader,
    NLogLine
  },
  provide () {
    return {
      NLog: this
    }
  },
  props: {
    ...useTheme.props,
    loading: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: false
    },
    log: {
      type: String,
      default: undefined
    },
    fontSize: {
      type: Number,
      default: 14
    },
    lines: {
      type: Array,
      default: () => []
    },
    lineHeight: {
      type: Number,
      default: 1.25
    },
    language: {
      type: String,
      default: undefined
    },
    rows: {
      type: Number,
      default: 15
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number,
      default: 0
    },
    hljs: {
      type: Object,
      default: undefined
    },
    onReachTop: {
      type: Function,
      default: undefined
    },
    onReachBottom: {
      type: Function,
      default: undefined
    },
    onRequireMore: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Log', 'Log', style, logLight, props)
    return {
      scrollbarRef: ref(null),
      mergedTheme: themeRef,
      mergedHljs: useHljs(props),
      cssVars: computed(() => {
        const {
          self: {
            loaderFontSize,
            loaderTextColor,
            loaderColor,
            loaderBorder,
            loadingColor
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--loader-font-size': loaderFontSize,
          '--loader-border': loaderBorder,
          '--loader-color': loaderColor,
          '--loader-text-color': loaderTextColor,
          '--loading-color': loadingColor
        }
      })
    }
  },
  data () {
    return {
      memorizedScrollTop: 0,
      slient: false,
      memorizedScrollBottom: null
    }
  },
  computed: {
    highlight () {
      return this.language !== undefined
    },
    styleHeight () {
      const lineHeight = Math.floor(this.fontSize * this.lineHeight)
      return `calc(${this.rows * lineHeight}px)`
    },
    mergedLines () {
      if (!this.log) return []
      return this.log.split('\n')
    }
  },
  created () {
    // TODO: refactor
    this.handleWheel = throttle(this.handleWheel, 300)
  },
  methods: {
    handleScroll (e) {
      const container = e.target
      const content = e.target.firstElementChild
      if (this.slient) {
        this.$nextTick(() => {
          this.slient = false
        })
        return
      }
      const containerHeight = container.offsetHeight
      const containerScrollTop = container.scrollTop
      const contentHeight = content.offsetHeight
      const scrollTop = containerScrollTop
      const scrollBottom = contentHeight - containerScrollTop - containerHeight
      if (scrollTop <= this.offsetTop) {
        const { onReachTop, onRequireMore } = this
        if (onRequireMore) onRequireMore('top')
        if (onReachTop) onReachTop()
      }
      if (scrollBottom <= this.offsetBottom) {
        const { onReachBottom, onRequireMore } = this
        if (onRequireMore) onRequireMore('bottom')
        if (onReachBottom) onReachBottom()
      }
    },
    handleWheel (e) {
      if (this.slient) {
        this.$nextTick(() => {
          this.slient = false
        })
        return
      }
      const { scrollbarRef } = this
      if (scrollbarRef) {
        const { containerRef, contentRef } = scrollbarRef
        if (containerRef && contentRef) {
          const containerHeight = containerRef.offsetHeight
          const containerScrollTop = containerRef.scrollTop
          const contentHeight = contentRef.offsetHeight
          const scrollTop = containerScrollTop
          const scrollBottom =
            contentHeight - containerScrollTop - containerHeight
          const deltaY = e.deltaY
          if (scrollTop === 0 && deltaY < 0) {
            const { onRequireMore } = this
            if (onRequireMore) onRequireMore('top')
          }
          if (scrollBottom <= 0 && deltaY > 0) {
            const { onRequireMore } = this
            if (onRequireMore) onRequireMore('bottom')
          }
        }
      }
    },
    scrollTo (options) {
      const { scrollbarRef } = this
      const { slient, top, position } = options
      if (slient) {
        this.slient = true
      }
      if (top !== undefined) {
        scrollbarRef.scrollTo({ left: 0, top })
      } else if (position === 'bottom') {
        scrollbarRef.scrollTo({ position: 'top' })
      } else if (position === 'top') {
        scrollbarRef.scrollTo({ position: 'bottom' })
      }
    },
    // deprecated
    scrollToTop (slient = false) {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'top'})` instead."
      )
      this.scrollTo({
        position: 'top',
        slient
      })
    },
    scrollToBottom (slient = false) {
      warn(
        'log',
        "`scrollToTop` is deprecated, please use `scrollTo({ position: 'bottom'})` instead."
      )
      this.scrollTo({
        position: 'bottom',
        slient
      })
    }
  }
})
</script>
