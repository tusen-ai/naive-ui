import { h, Transition, TransitionGroup } from 'vue'

export default {
  name: 'FadeInExpandTransition',
  props: {
    appear: {
      type: Boolean,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: undefined
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    width: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBeforeLeave (el) {
      if (this.width) {
        el.style.maxWidth = el.offsetWidth + 'px'
      } else {
        el.style.maxHeight = el.offsetHeight + 'px'
      }
      void el.offsetWidth
    },
    handleLeave (el) {
      if (this.width) {
        el.style.maxWidth = 0
      } else {
        el.style.maxHeight = 0
      }
      void el.offsetWidth
    },
    handleAfterLeave (el) {
      if (this.width) {
        el.style.maxWidth = null
      } else {
        el.style.maxHeight = null
      }
      const {
        onAfterLeave
      } = this
      if (this.onAfterLeave) onAfterLeave()
    },
    handleEnter (el) {
      el.style.transition = 'none'
      if (this.width) {
        const memorizedWidth = el.offsetWidth
        el.style.maxWidth = 0
        void el.offsetWidth
        el.style.transition = null
        el.style.maxWidth = memorizedWidth + 'px'
      } else {
        const memorizedHeight = el.offsetHeight
        el.style.maxHeight = 0
        void el.offsetWidth
        el.style.transition = null
        el.style.maxHeight = memorizedHeight + 'px'
      }
      void el.offsetWidth
    },
    handleAfterEnter (el) {
      if (this.width) {
        el.style.maxWidth = null
      } else {
        el.style.maxHeight = null
      }
    }
  },
  render () {
    const type = this.group ? TransitionGroup : Transition
    return h(type, {
      name: this.width
        ? 'n-fade-in-width-expand-transition'
        : 'n-fade-in-height-expand-transition',
      mode: this.mode,
      appear: this.appear,
      onEnter: this.handleEnter,
      onAfterEnter: this.handleAfterEnter,
      onBeforeLeave: this.handleBeforeLeave,
      onLeave: this.handleLeave,
      onAfterLeave: this.handleAfterLeave
    }, {
      default: this.$slots.default
    })
  }
}
