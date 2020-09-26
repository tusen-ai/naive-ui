import { h, Transition } from 'vue'

export default {
  name: 'FadeInExpandTransition',
  props: {
    appear: {
      type: Boolean,
      default: false
    },
    mode: {
      validator (value) {
        return ['width', 'height'].includes(value)
      },
      default: 'height'
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    // deprecated
    width: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    compitableMode () {
      return this.width ? 'width' : this.mode
    }
  },
  methods: {
    handleBeforeLeave (el) {
      if (this.compitableMode === 'width') {
        el.style.maxWidth = el.offsetWidth + 'px'
      } else {
        el.style.maxHeight = el.offsetHeight + 'px'
      }
      void el.offsetWidth
    },
    handleLeave (el) {
      if (this.compitableMode === 'width') {
        el.style.maxWidth = 0
      } else {
        el.style.maxHeight = 0
      }
      void el.offsetWidth
    },
    handleAfterLeave (el) {
      if (this.compitableMode === 'width') {
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
      if (this.compitableMode === 'width') {
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
      if (this.compitableMode === 'width') {
        el.style.maxWidth = null
      } else {
        el.style.maxHeight = null
      }
    }
  },
  render () {
    return h(Transition, {
      name: this.compitableMode === 'width'
        ? 'n-fade-in-width-expand-transition'
        : 'n-fade-in-height-expand-transition',
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
