export default {
  methods: {
    handleBeforeLeave () {
      this.$el.style.maxHeight = this.$el.offsetHeight + 'px'
      this.$el.style.height = this.$el.offsetHeight + 'px'
      this.$el.getBoundingClientRect()
    },
    handleLeave () {
      this.$el.style.maxHeight = 0
      this.$el.getBoundingClientRect()
    },
    handleEnter () {
      this.$nextTick().then(() => {
        this.$el.style.height = this.$el.offsetHeight + 'px'
        this.$el.style.maxHeight = 0
        this.$el.getBoundingClientRect()
        this.$el.style.maxHeight = this.$el.style.height
      })
    },
    handleAfterEnter () {
      this.$el.style.height = null
      this.$el.style.maxHeight = null
    }
  },
  render (h) {
    return h('transition', {
      props: {
        name: 'n-height-seamlessly-expand'
      },
      on: {
        beforeLeave: this.handleBeforeLeave,
        leave: this.handleLeave,
        enter: this.handleEnter,
        afterEnter: this.handleAfterEnter
      }
    }, this.$slots.default)
  }
}
