<template>
  <div
    class="n-affix"
    :class="{
      [`n-affix--affixed`]: affixed
    }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
import getScrollParent from '../../../utils/dom/getScrollParent'

export default {
  name: 'NAffix',
  props: {
    target: {
      type: Function,
      default: null
    },
    top: {
      type: Number,
      default: null
    },
    bottom: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      container: null,
      stickToTop: false,
      stickToBottom: false,
      memorizedTop: null
    }
  },
  computed: {
    style () {
      const style = {}
      if (this.affixed && this.memorizedTop !== null) {
        style.top = `${this.memorizedTop}px`
      }
      return style
    },
    affixed () {
      return this.stickToTop || this.stickToBottom
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
      }
    },
    handleScroll (e) {
      const containerEl = this.container.nodeName === '#document' ? this.container.documentElement : this.container
      let scrollTop = containerEl.scrollTop
      let scrollBottom = containerEl.scrollBottom
      const originalAffixed = this.affixed
      if (this.top !== null && scrollTop >= this.top) {
        this.stickToTop = true
      } else {
        this.stickToTop = false
      }
      if (this.bottom !== null && scrollBottom >= this.bottom) {
        this.stickToBottom = true
      } else {
        this.stickToBottom = false
      }
      if (!originalAffixed && this.affixed) {
        let {
          top
        } = this.$el.getBoundingClientRect()
        // console.log(e, this.$el.getBoundingClientRect().top)
        this.memorizedTop = top
        // debugger
      }
    }
  }
}
</script>
