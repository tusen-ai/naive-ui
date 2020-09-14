
import { h, Transition } from 'vue'
import NMessage from './Message.js'
import props from './message-props'

export default {
  name: 'MessageEnvironment',
  props: {
    ...props,
    duration: {
      type: Number,
      default: 3000
    },
    onClose: {
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
      default: () => {}
    },
    // deprecated
    onHide: {
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
      // internal state
      timerId: null,
      show: true
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
        timerId,
        onClose,
        onHide
      } = this
      this.show = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
      onClose()
      // deprecated
      onHide()
    },
    handleClose () {
      this.hide()
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
    // deprecated
    deactivate () {
      this.hide()
    }
  },
  render () {
    return h(
      Transition, {
        name: 'message-transition',
        appear: true,
        onAfterLeave: this.handleAfterLeave
      },
      {
        default: () => [
          this.show
            ? h(NMessage, {
              theme: this.theme,
              content: this.content,
              type: this.type,
              icon: this.icon,
              closable: this.closable,
              onClose: this.handleClose
            }) : null
        ]
      }
    )
  }
}
