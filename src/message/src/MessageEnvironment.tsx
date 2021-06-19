import { h, defineComponent, ref, onMounted, PropType } from 'vue'
import { NFadeInExpandTransition } from '../../_internal'
import NMessage from './Message'
import { messageProps } from './message-props'

export default defineComponent({
  name: 'MessageEnvironment',
  props: {
    ...messageProps,
    duration: {
      type: Number,
      default: 3000
    },
    onAfterLeave: Function,
    onLeave: Function,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: Function as PropType<(key: string) => void>,
    // deprecated
    onHide: Function,
    onAfterHide: Function
  },
  setup (props) {
    const timerIdRef = ref<number | null>(null)
    const showRef = ref<boolean>(true)
    onMounted(() => {
      const { duration } = props
      if (duration) {
        timerIdRef.value = window.setTimeout(hide, duration)
      }
    })
    function hide (): void {
      const { value: timerId } = timerIdRef
      const { onHide } = props
      showRef.value = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
      // deprecated
      if (onHide) onHide()
    }
    function handleClose (): void {
      const { onClose } = props
      if (onClose) onClose()
      hide()
    }
    function handleAfterLeave (): void {
      const { onAfterLeave, onInternalAfterLeave, onAfterHide, internalKey } =
        props
      if (onAfterLeave) onAfterLeave()
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey)
      // deprecated
      if (onAfterHide) onAfterHide()
    }
    // deprecated
    function deactivate (): void {
      hide()
    }
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      deactivate
    }
  },
  render () {
    return (
      <NFadeInExpandTransition
        appear
        onAfterLeave={this.handleAfterLeave}
        onLeave={this.onLeave}
      >
        {{
          default: () => [
            this.show ? (
              <NMessage
                content={this.content}
                type={this.type}
                icon={this.icon}
                closable={this.closable}
                onClose={this.handleClose}
              />
            ) : null
          ]
        }}
      </NFadeInExpandTransition>
    )
  }
})
