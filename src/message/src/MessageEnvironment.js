
import { h, Transition, Teleport } from 'vue'
import NMessage from './Message.js'
import props from './message-props'

export default {
  name: 'MessageEnvironment',
  emits: [
    'internal-after-leave'
  ],
  props: {
    ...props,
    duration: {
      type: Number,
      default: 3000
    },
    onClose: {
      type: Function,
      default: null
    },
    onAfterLeave: {
      type: Function,
      default: null
    },
    destroy: {
      type: Function,
      default: null
    },
    // private
    controller: {
      type: Object,
      required: true
    },
    onInternalAfterLeave: {
      type: Function,
      default: null
    },
    // deprecated
    onHide: {
      type: Function,
      default: null
    },
    onAfterHide: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      // internal state
      timerId: null,
      show: true
    }
  },
  created () {
    this.controller.destroy = this.hide
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
      if (onClose) onClose()
      // deprecated
      if (onHide) onHide()
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
      if (onAfterLeave) onAfterLeave()
      if (onInternalAfterLeave) onInternalAfterLeave(this._.vnode.key)
      // deprecated
      if (onAfterHide) onAfterHide()
    },
    // deprecated
    deactivate () {
      this.hide()
    }
  },
  render () {
    return h(Teleport, {
      to: '.n-message-container'
    }, {
      default: () => [
        h(
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
      ]
    })
  }
}
