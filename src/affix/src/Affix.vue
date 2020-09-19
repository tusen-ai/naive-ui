<template>
  <div
    class="n-affix"
    :class="{
      [`n-affix--affixed`]: affixed,
      [`n-affix--absolute-positioned`]: position === 'absolute'
    }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
import getScrollParent from '../../_utils/dom/getScrollParent'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'
import getTarget from '../../_utils/dom/get-target'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'Affix',
  mixins: [usecssr(styles)],
  props: {
    listenTo: {
      type: [String, Object],
      default: null
    },
    offsetTop: {
      type: Number,
      default: null
    },
    top: {
      type: Number,
      default: null
    },
    offsetBottom: {
      type: Number,
      default: null
    },
    bottom: {
      type: Number,
      default: null
    },
    position: {
      type: String,
      default: 'fix'
    },
    // deprecated
    target: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      scrollElement: null,
      stickToTop: false,
      stickToBottom: false,
      bottomAffixedTriggerScrollTop: null,
      topAffixedTriggerScrollTop: null
    }
  },
  computed: {
    affixed () {
      return this.stickToBottom || this.stickToTop
    },
    syntheticOffsetTop () {
      return this.offsetTop === null ? this.top : this.offsetTop
    },
    syntheticTop () {
      return this.top === null ? this.offsetTop : this.top
    },
    syntheticBottom () {
      return this.bottom === null ? this.offsetBottom : this.bottom
    },
    syntheticOffsetBottom () {
      return this.offsetBottom === null ? this.bottom : this.offsetBottom
    },
    style () {
      const style = {}
      if (this.stickToTop && this.syntheticOffsetTop !== null) {
        style.top = `${this.syntheticTop}px`
      }
      if (this.stickToBottom && this.syntheticOffsetBottom !== null) {
        style.bottom = `${this.syntheticBottom}px`
      }
      return style
    }
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    const { scrollElement } = this
    if (scrollElement) {
      scrollElement.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    init () {
      const {
        target: getScrollTarget,
        listenTo
      } = this
      let scrollElement
      if (getScrollTarget) {
        // deprecated
        scrollElement = getScrollTarget()
      } else if (listenTo) {
        scrollElement = getTarget(listenTo)
      } else {
        scrollElement = getScrollParent(this.$el)
      }
      if (scrollElement) {
        this.scrollElement = scrollElement
      } else if (__DEV__) {
        warn('affix', 'Target to be listened to is not valid.')
      }
      if (scrollElement) {
        scrollElement.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }
    },
    handleScroll (e) {
      const containerEl = this.scrollElement
      if (this.affixed) {
        if (containerEl.scrollTop < this.topAffixedTriggerScrollTop) {
          this.stickToTop = false
          this.topAffixedTriggerScrollTop = null
        }
        if (containerEl.scrollTop > this.bottomAffixedTriggerScrollTop) {
          this.stickToBottom = false
          this.bottomAffixedTriggerScrollTop = null
        }
        return
      }
      const containerRect = containerEl.getBoundingClientRect()
      const affixRect = this.$el.getBoundingClientRect()
      const pxToTop = affixRect.top - containerRect.top
      const pxToBottom = containerRect.bottom - affixRect.bottom
      const {
        syntheticOffsetTop,
        syntheticOffsetBottom
      } = this
      if (syntheticOffsetTop !== null && pxToTop <= syntheticOffsetTop) {
        this.stickToTop = true
        this.topAffixedTriggerScrollTop = containerEl.scrollTop - (syntheticOffsetTop - pxToTop)
      } else {
        this.stickToTop = false
        this.topAffixedTriggerScrollTop = null
      }
      if (syntheticOffsetBottom !== null && pxToBottom <= syntheticOffsetBottom) {
        this.stickToBottom = true
        this.bottomAffixedTriggerScrollTop = containerEl.scrollTop + syntheticOffsetBottom - pxToBottom
      } else {
        this.stickToBottom = false
        this.bottomAffixedTriggerScrollTop = null
      }
    }
  }
}
</script>
