// use absolute path to make sure no circular ref of style
// this -> modal-index -> modal-style
import { h, defineComponent, type PropType, ref } from 'vue'
import NModal, { modalProps } from './Modal'

export const NModalEnvironment = defineComponent({
  name: 'ModalEnvironment',
  props: {
    ...modalProps,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: {
      type: Function as PropType<(key: string) => void>,
      required: true
    }
  },
  setup (props) {
    const showRef = ref(true)
    function handleAfterLeave (): void {
      const { onInternalAfterLeave, internalKey, onAfterLeave } = props
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey)
      if (onAfterLeave) onAfterLeave()
    }
    function handlePositiveClick (): void {
      const { onPositiveClick } = props
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then((result) => {
          if (result === false) return
          hide()
        })
      } else {
        hide()
      }
    }
    function handleNegativeClick (): void {
      const { onNegativeClick } = props
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then((result) => {
          if (result === false) return
          hide()
        })
      } else {
        hide()
      }
    }
    function handleCloseClick (): void {
      const { onClose } = props
      if (onClose) {
        void Promise.resolve(onClose()).then((result) => {
          if (result === false) return
          hide()
        })
      } else {
        hide()
      }
    }
    function handleMaskClick (e: MouseEvent): void {
      const { onMaskClick, maskClosable } = props
      if (onMaskClick) {
        onMaskClick(e)
        maskClosable && hide()
      }
    }
    function handleEsc (): void {
      const { onEsc } = props
      if (onEsc) {
        onEsc()
      }
    }
    function hide (): void {
      showRef.value = false
    }
    function handleUpdateShow (value: boolean): void {
      showRef.value = value
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleCloseClick,
      handleNegativeClick,
      handlePositiveClick,
      handleMaskClick,
      handleEsc
    }
  },
  render () {
    const {
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      show
    } = this
    return (
      <NModal
        {...this.$props}
        show={show}
        onUpdateShow={handleUpdateShow}
        onMaskClick={handleMaskClick}
        onEsc={handleEsc}
        onAfterLeave={handleAfterLeave}
        internalAppear
        internalModal
      ></NModal>
    )
  }
})
