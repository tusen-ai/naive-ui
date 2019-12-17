<template>
  <div
    class="n-log"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="{
      lineHeight: lineHeight,
      height: styleHeight
    }"
    @wheel="handleWheel"
  >
    <n-scrollbar ref="scrollbar" @scroll="handleScroll">
      <!-- <pre class="n-log__lines">{{ processedLog }}</pre> -->
      <n-log-line v-for="(line, index) in synthesizedLines" :key="index" :line="line" />
      <!-- <pre v-for="(line, index) in synthesizedLines" :key="index" class="n-log__line">{{ line }}</pre> -->
    </n-scrollbar>
    <n-fade-in-height-expand-transition width>
      <n-log-loader v-if="loading" />
    </n-fade-in-height-expand-transition>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import NScrollbar from '../../Scrollbar'
import NLogLoader from './LogLoader'
import NFadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import NLogLine from './LogLine'

export default {
  name: 'NLog',
  components: {
    NScrollbar,
    NLogLoader,
    NLogLine,
    NFadeInHeightExpandTransition
  },
  mixins: [ withapp, themeable ],
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
    lines: {
      type: Array,
      default: () => []
    },
    lineHeight: {
      type: Number,
      default: 1.25
    },
    rows: {
      type: Number,
      default: 20
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
      memorizedScrollBottom: null
    }
  },
  computed: {
    paddingStyleHeight () {
      return `${this.lineHeight}em`
    },
    styleHeight () {
      return `${this.rows * this.lineHeight}em`
    },
    processedLog () {
      if (this.trim && this.log) return this.log.trim()
      else return this.log
    },
    synthesizedLines () {
      if (this.lines.length) return this.lines
      if (!this.log) return []
      return this.log.split('\n')
    }
  },
  methods: {
    getHljs () {
      return this.hljs || this.$naive.hljs
    },
    handleScroll (e, container, content) {
      const containerHeight = container.offsetHeight
      const containerScrollTop = container.scrollTop
      const contentHeight = content.offsetHeight
      const scrollTop = containerScrollTop
      const scrollBottom = contentHeight - containerScrollTop - containerHeight
      if (scrollTop <= this.offsetTop) this.$emit('reach-top')
      if (scrollBottom <= this.offsetBottom) this.$emit('reach-bottom')
    },
    handleWheel (e) {
      if (this.$refs.scrollbar && this.$refs.scrollbar.$refs.scrollContainer) {
        const container = this.$refs.scrollbar.$refs.scrollContainer
        const containerHeight = container.offsetHeight
        const containerScrollTop = container.scrollTop
        if (this.$refs.scrollbar.$refs.scrollContent) {
          const content = this.$refs.scrollbar.$refs.scrollContent
          const contentHeight = content.offsetHeight
          const scrollTop = containerScrollTop
          const scrollBottom = contentHeight - containerScrollTop - containerHeight
          const deltaY = e.deltaY
          if (scrollTop === 0 && deltaY < 0) this.$emit('reach-top')
          if (scrollBottom === 0 && deltaY > 0) this.$emit('reach-bottom')
        }
      }
    }
  }
}
</script>
