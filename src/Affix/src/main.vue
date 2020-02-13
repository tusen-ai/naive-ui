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

export default {
  name: 'NAffix',
  props: {
    target: {
      type: Function,
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
    }
  },
  data () {
    return {
      container: null,
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
  beforeDestroy () {
    if (this.container) {
      this.container.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    init () {
      if (this.target) {
        this.container = this.target()
      } else {
        this.container = getScrollParent(this.$el)
      }
      if (this.container) {
        this.container.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }
    },
    handleScroll (e) {
      const containerEl = this.container.nodeName === '#document' ? this.container.documentElement : this.container
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
      if (this.syntheticOffsetTop !== null && pxToTop <= this.syntheticOffsetTop) {
        this.stickToTop = true
        this.topAffixedTriggerScrollTop = containerEl.scrollTop - (this.syntheticOffsetTop - pxToTop)
      } else {
        this.stickToTop = false
        this.topAffixedTriggerScrollTop = null
      }
      if (this.syntheticOffsetBottom !== null && pxToBottom <= this.syntheticOffsetBottom) {
        this.stickToBottom = true
        this.bottomAffixedTriggerScrollTop = containerEl.scrollTop + this.syntheticOffsetBottom - pxToBottom
      } else {
        this.stickToBottom = false
        this.bottomAffixedTriggerScrollTop = null
      }
    }
  }
}
</script>
