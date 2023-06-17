import { h, defineComponent, ref, onMounted, type PropType } from 'vue'
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
    let timerId: number | null = null
    const showRef = ref<boolean>(true)
    onMounted(() => {
      setHideTimeout()
    })
    function setHideTimeout (): void {
      const { duration } = props
      if (duration) {
        timerId = window.setTimeout(hide, duration)
      }
    }
    function handleMouseenter (e: MouseEvent): void {
      if (e.currentTarget !== e.target) return
      if (timerId !== null) {
        window.clearTimeout(timerId)
        timerId = null
      }
    }
    function handleMouseleave (e: MouseEvent): void {
      if (e.currentTarget !== e.target) return
      setHideTimeout()
    }
    function hide (): void {
      const { onHide } = props
      showRef.value = false
      if (timerId) {
        window.clearTimeout(timerId)
        timerId = null
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
      handleMouseleave,
      handleMouseenter,
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
                showIcon={this.showIcon}
                closable={this.closable}
                onClose={this.handleClose}
                onMouseenter={
                  this.keepAliveOnHover ? this.handleMouseenter : undefined
                }
                onMouseleave={
                  this.keepAliveOnHover ? this.handleMouseleave : undefined
                }
              />
            ) : null
          ]
        }}
      </NFadeInExpandTransition>
    )
  }
})
