import type { PropType } from 'vue'
// use absolute path to make sure no circular ref of style
// this -> modal-index -> modal-style
import { defineComponent, h, ref } from 'vue'
import { call, omit } from '../../_utils'
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
  setup(props) {
    const showRef = ref(true)
    function handleAfterLeave(): void {
      const { onInternalAfterLeave, internalKey, onAfterLeave } = props
      if (onInternalAfterLeave)
        onInternalAfterLeave(internalKey)
      if (onAfterLeave)
        onAfterLeave()
    }
    function handleMaskClick(e: MouseEvent): void {
      const { onMaskClick, maskClosable } = props
      if (onMaskClick) {
        onMaskClick(e)
        if (maskClosable) {
          hide()
        }
      }
    }
    function handleEsc(): void {
      const { onEsc } = props
      if (onEsc) {
        onEsc()
      }
    }
    function hide(): void {
      showRef.value = false
    }
    function handleUpdateShow(value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow)
        call(onUpdateShow, value)
      if (_onUpdateShow)
        call(_onUpdateShow, value)
      showRef.value = value
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc
    }
  },
  render() {
    const {
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      show
    } = this
    return (
      <NModal
        {...omit(this.$props, [
          'onUpdateShow',
          'onUpdate:show',
          'onMaskClick',
          'onEsc',
          'onAfterLeave'
        ])}
        show={show}
        onUpdateShow={handleUpdateShow}
        onMaskClick={handleMaskClick}
        onEsc={handleEsc}
        onAfterLeave={handleAfterLeave}
        internalAppear
        internalModal
      >
        {this.$slots}
      </NModal>
    )
  }
})
