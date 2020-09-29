import { nextTick, Transition, h } from 'vue'
import NNotification from './Notification.vue'

export default {
  name: 'NotificationEnvironment',
  props: {
    duration: {
      type: Number,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    },
    avatar: {
      type: Function,
      default: undefined
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    description: {
      type: [String, Function],
      default: undefined
    },
    content: {
      type: [String, Function],
      default: undefined
    },
    meta: {
      type: [String, Function],
      default: undefined
    },
    action: {
      type: Function,
      default: undefined
    },
    closable: {
      type: Boolean,
      default: undefined
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    onHide: {
      type: Function,
      default: () => {}
    },
    onAfterEnter: {
      type: Function,
      default: () => {}
    },
    onAfterLeave: {
      type: Function,
      default: () => {}
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    },
    // deprecated
    onAfterShow: {
      type: Function,
      default: () => {}
    },
    onAfterHide: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      show: true,
      timerId: null
    }
  },
  mounted () {
    if (this.duration) {
      this.timerId = window.setTimeout(this.hide, this.duration)
    }
  },
  methods: {
    hide () {
      const {
        timerId
      } = this
      this.show = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
    },
    handleBeforeEnter (el) {
      nextTick(() => {
        el.style.height = el.offsetHeight + 'px'
        el.style.maxHeight = 0
        el.style.transition = 'none'
        void el.offsetHeight
        el.style.transition = null
        el.style.maxHeight = el.style.height
      })
    },
    handleAfterEnter (el) {
      el.style.height = null
      el.style.maxHeight = null
      this.onAfterEnter(this)
      // deprecated
      this.onAfterShow(this)
    },
    handleBeforeLeave (el) {
      el.style.maxHeight = el.offsetHeight + 'px'
      el.style.height = el.offsetHeight + 'px'
      void el.offsetHeight
    },
    handleLeave (el) {
      this.onHide()
      el.style.maxHeight = 0
      void el.offsetHeight
    },
    handleAfterLeave () {
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide
      } = this
      onAfterLeave()
      onInternalAfterLeave(this._.vnode.key)
      // deprecated
      onAfterHide()
    },
    handleClose () {
      Promise
        .resolve(
          this.onClose()
        )
        .then(feedback => {
          if (feedback === false) return
          this.hide()
        })
    },
    // deprecated
    deactivate () {
      this.hide()
    }
  },
  render () {
    return h(Transition, {
      name: 'n-notification-transition',
      appear: true,
      onBeforeEnter: this.handleBeforeEnter,
      onAfterEnter: this.handleAfterEnter,
      onBeforeLeave: this.handleBeforeLeave,
      onLeave: this.handleLeave,
      onAfterLeave: this.handleAfterLeave
    }, {
      default: () => [
        this.show ? h(NNotification, {
          type: this.type,
          theme: this.theme,
          avatar: this.avatar,
          title: this.title,
          description: this.description,
          content: this.content,
          meta: this.meta,
          action: this.action,
          closable: this.closable,
          onClose: this.handleClose
        }) : null
      ]
    })
  }
}
