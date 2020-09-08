<script>
import { h, nextTick } from 'vue'
import getDefaultSlot from '../_utils/vue/getDefaultSlot'

export default {
  props: {
    transitionDisabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    }
  },
  beforeDestroy () {
    if (this.transitionDisabled) {
      const parent = this.$el.parentElement
      if (parent) parent.removeChild(this.$el)
    }
  },
  methods: {
    handleBeforeLeave () {
      const el = this.$el
      if (this.width) {
        el.style.maxWidth = el.offsetWidth + 'px'
        el.style.width = el.offsetWidth + 'px'
      } else {
        el.style.maxHeight = el.offsetHeight + 'px'
        el.style.height = el.offsetHeight + 'px'
      }
      void el.offsetWidth
    },
    handleLeave () {
      const el = this.$el
      if (this.width) {
        el.style.maxWidth = 0
      } else {
        el.style.maxHeight = 0
      }
      void el.offsetWidth
    },
    handleAfterLeave () {
      const el = this.$el
      if (!el || this.$el.nodeType !== 1) return
      if (this.width) {
        el.style.maxWidth = null
      } else {
        el.style.maxHeight = null
      }
      this.$emit('after-leave')
    },
    handleEnter () {
      nextTick(() => {
        const el = this.$el
        if (this.width) {
          el.style.maxWidth = 'unset'
          el.style.width = el.offsetWidth + 'px'
          el.style.maxWidth = 0
        } else {
          el.style.height = el.offsetHeight + 'px'
          el.style.maxHeight = 0
        }
        el.style.transition = 'none'
        void el.offsetWidth
        el.style.transition = null
        void el.offsetWidth
        if (this.width) {
          el.style.maxWidth = el.style.width
        } else {
          el.style.maxHeight = el.style.height
        }
      })
    },
    handleAfterEnter () {
      const el = this.$el
      if (this.width) {
        el.style.width = null
        el.style.maxWidth = null
      } else {
        el.style.height = null
        el.style.maxHeight = null
      }
    }
  },
  render () {
    return h('transition', {
      props: {
        name: this.width ? 'n-fade-in-width-expand-transition' : 'n-fade-in-height-expand-transition',
        appear: this.appear
      },
      on: {
        beforeLeave: this.handleBeforeLeave,
        leave: this.handleLeave,
        enter: this.handleEnter,
        afterEnter: this.handleAfterEnter,
        afterLeave: this.handleAfterLeave
      }
    }, getDefaultSlot(this))
  }
}

</script>
