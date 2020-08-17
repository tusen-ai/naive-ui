<template>
  <div
    class="n-log"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="{
      lineHeight: lineHeight,
      height: styleHeight
    }"
    @wheel="handleWheel"
  >
    <n-scrollbar
      ref="scrollbar"
      class="n-code"
      :theme="syntheticTheme"
      @scroll="handleScroll"
    >
      <n-log-line
        v-for="(line, index) in syntheticLines"
        :key="index"
        :line="line"
      />
    </n-scrollbar>
    <n-fade-in-height-expand-transition width>
      <n-log-loader v-if="loading" :theme="syntheticTheme" />
    </n-fade-in-height-expand-transition>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NScrollbar from '../../scrollbar'
import NLogLoader from './LogLoader'
import NLogLine from './LogLine'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import throttle from 'lodash-es/throttle'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Log',
  components: {
    NScrollbar,
    NLogLoader,
    NLogLine,
    NFadeInHeightExpandTransition
  },
  provide () {
    return {
      NLog: this
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
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
      default: null
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
      default: null
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
      default: null
    }
  },
  data () {
    return {
      memorizedScrollTop: 0,
      dismissEvent: false,
      memorizedScrollBottom: null
    }
  },
  computed: {
    highlight () {
      return this.language !== null
    },
    styleHeight () {
      const lineHeight = Math.floor(this.fontSize * this.lineHeight)
      return `calc(${this.rows * lineHeight}px)`
    },
    syntheticLines () {
      if (!this.log) return []
      return this.log.split('\n')
    }
  },
  created () {
    this.handleWheel = throttle(this.handleWheel, 300)
  },
  methods: {
    getHljs () {
      return this.hljs || this.$naive.hljs
    },
    handleScroll (e, container, content) {
      if (this.dismissEvent) {
        this.$nextTick().then(() => {
          this.dismissEvent = false
        })
        return
      }
      const containerHeight = container.offsetHeight
      const containerScrollTop = container.scrollTop
      const contentHeight = content.offsetHeight
      const scrollTop = containerScrollTop
      const scrollBottom = contentHeight - containerScrollTop - containerHeight
      if (scrollTop <= this.offsetTop) {
        this.$emit('require-more', 'top')
        this.$emit('reach-top')
      }
      if (scrollBottom <= this.offsetBottom) {
        this.$emit('require-more', 'bottom')
        this.$emit('reach-bottom')
      }
    },

    handleWheel (e) {
      if (this.dismissEvent) {
        this.$nextTick().then(() => {
          this.dismissEvent = false
        })
        return
      }
      if (this.$refs.scrollbar && this.$refs.scrollbar.$refs.scrollContainer) {
        const container = this.$refs.scrollbar.$refs.scrollContainer
        const containerHeight = container.offsetHeight
        const containerScrollTop = container.scrollTop
        if (this.$refs.scrollbar.$refs.scrollContent) {
          const content = this.$refs.scrollbar.$refs.scrollContent
          const contentHeight = content.offsetHeight
          const scrollTop = containerScrollTop
          const scrollBottom =
            contentHeight - containerScrollTop - containerHeight
          const deltaY = e.deltaY
          if (scrollTop === 0 && deltaY < 0) this.$emit('require-more', 'top')
          if (scrollBottom <= 0 && deltaY > 0) {
            this.$emit('require-more', 'bottom')
          }
        }
      }
    },
    scrollToTop (dismissEvent = false) {
      this.scrollTo('top', dismissEvent)
    },
    scrollToBottom (dismissEvent = false) {
      this.scrollTo('bottom', dismissEvent)
    },
    scrollTo (to, dismissEvent = false) {
      if (dismissEvent) {
        this.dismissEvent = true
      }
      if (to === 'bottom') {
        this.$refs.scrollbar.scrollToBottom()
      } else {
        this.$refs.scrollbar.scrollToTop()
      }
    }
  }
}
</script>
