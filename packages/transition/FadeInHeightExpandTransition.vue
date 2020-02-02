<script>
export default {
  props: {
    transitionDisabled: {
      type: Boolean,
      default: false
    },
    width: {
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
      if (this.width) {
        this.$el.style.maxWidth = this.$el.offsetWidth + 'px'
        this.$el.style.width = this.$el.offsetWidth + 'px'
      } else {
        this.$el.style.maxHeight = this.$el.offsetHeight + 'px'
        this.$el.style.height = this.$el.offsetHeight + 'px'
      }
      this.$el.getBoundingClientRect()
    },
    handleLeave () {
      if (this.width) {
        this.$el.style.maxWidth = 0
      } else {
        this.$el.style.maxHeight = 0
      }
      this.$el.getBoundingClientRect()
    },
    handleAfterLeave () {
      if (this.width) {
        this.$el.style.maxWidth = null
      } else {
        this.$el.style.maxHeight = null
      }
      this.$emit('after-leave')
    },
    handleEnter () {
      this.$nextTick().then(() => {
        if (this.width) {
          this.$el.style.maxWidth = 'unset'
          this.$el.style.width = this.$el.offsetWidth + 'px'
          this.$el.style.maxWidth = 0
        } else {
          this.$el.style.height = this.$el.offsetHeight + 'px'
          this.$el.style.maxHeight = 0
        }
        this.$el.style.transition = 'none'
        this.$el.getBoundingClientRect()
        this.$el.style.transition = null
        this.$el.getBoundingClientRect()
        if (this.width) {
          this.$el.style.maxWidth = this.$el.style.width
        } else {
          this.$el.style.maxHeight = this.$el.style.height
        }
      })
    },
    handleAfterEnter () {
      if (this.width) {
        this.$el.style.width = null
        this.$el.style.maxWidth = null
      } else {
        this.$el.style.height = null
        this.$el.style.maxHeight = null
      }
    }
  },
  render (h) {
    return h('transition', {
      props: {
        name: this.width ? 'n-fade-in-width-expand' : 'n-fade-in-height-expand'
      },
      on: {
        beforeLeave: this.handleBeforeLeave,
        leave: this.handleLeave,
        enter: this.handleEnter,
        afterEnter: this.handleAfterEnter,
        afterLeave: this.handleAfterLeave
      }
    }, this.$slots.default)
  }
}

</script>
