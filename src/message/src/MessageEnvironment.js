import { h, defineComponent } from 'vue'
import { NFadeInExpandTransition } from '../../_base'
import NMessage from './Message.js'
import props from './message-props'

export default defineComponent({
  name: 'MessageEnvironment',
  props: {
    ...props,
    duration: {
      type: Number,
      default: 3000
    },
    onClose: {
      type: Function,
      default: undefined
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      default: undefined
    },
    // deprecated
    onHide: {
      type: Function,
      default: undefined
    },
    onAfterHide: {
      type: Function,
      default: undefined
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
      const { timerId, onHide } = this
      this.show = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
      // deprecated
      if (onHide) onHide()
    },
    handleClose () {
      const { onClose } = this
      if (onClose) onClose()
      this.hide()
    },
    handleAfterLeave () {
      const { onAfterLeave, onInternalAfterLeave, onAfterHide } = this
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
    return h(
      NFadeInExpandTransition,
      {
        appear: true,
        onAfterLeave: this.handleAfterLeave
      },
      {
        default: () => [
          this.show
            ? h(NMessage, {
              content: this.content,
              type: this.type,
              icon: this.icon,
              closable: this.closable,
              onClose: this.handleClose
            })
            : null
        ]
      }
    )
  }
})
