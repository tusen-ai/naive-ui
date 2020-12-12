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
import { getScrollParent, unwrapElement } from 'seemly'
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles/index.js'
import { warn } from '../../_utils'

export default {
  name: 'Affix',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    listenTo: {
      type: [String, Object],
      default: undefined
    },
    offsetTop: {
      type: Number,
      default: undefined
    },
    top: {
      type: Number,
      default: undefined
    },
    offsetBottom: {
      type: Number,
      default: undefined
    },
    bottom: {
      type: Number,
      default: undefined
    },
    position: {
      type: String,
      default: 'fix'
    },
    // deprecated
    target: {
      validator () {
        warn('affix', '`target` is deprecated, please use `listen-to` instead.')
        return true
      },
      default: undefined
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
    mergedOffsetTop () {
      return this.offsetTop === undefined ? this.top : this.offsetTop
    },
    mergedTop () {
      return this.top === undefined ? this.offsetTop : this.top
    },
    mergedBottom () {
      return this.bottom === undefined ? this.offsetBottom : this.bottom
    },
    mergedOffsetBottom () {
      return this.offsetBottom === undefined ? this.bottom : this.offsetBottom
    },
    style () {
      const style = {}
      if (this.stickToTop && this.mergedOffsetTop !== undefined) {
        style.top = `${this.mergedTop}px`
      }
      if (this.stickToBottom && this.mergedOffsetBottom !== undefined) {
        style.bottom = `${this.mergedBottom}px`
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
      const { target: getScrollTarget, listenTo } = this
      let scrollElement
      if (getScrollTarget) {
        // deprecated
        scrollElement = getScrollTarget()
      } else if (listenTo) {
        scrollElement = unwrapElement(listenTo)
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
      const { mergedOffsetTop, mergedOffsetBottom } = this
      if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
        this.stickToTop = true
        this.topAffixedTriggerScrollTop =
          containerEl.scrollTop - (mergedOffsetTop - pxToTop)
      } else {
        this.stickToTop = false
        this.topAffixedTriggerScrollTop = null
      }
      if (
        mergedOffsetBottom !== undefined &&
        pxToBottom <= mergedOffsetBottom
      ) {
        this.stickToBottom = true
        this.bottomAffixedTriggerScrollTop =
          containerEl.scrollTop + mergedOffsetBottom - pxToBottom
      } else {
        this.stickToBottom = false
        this.bottomAffixedTriggerScrollTop = null
      }
    }
  }
}
</script>
