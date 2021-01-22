// use absolute path to make sure no circular ref of style
// this -> modal-index -> modal-style
import { h, defineComponent, PropType, ref } from 'vue'
import NModal from '../../modal/src/Modal'
import { keep } from '../../_utils'
import NDialog, { dialogProps, dialogPropKeys } from './Dialog'

export const exposedDialogEnvProps = {
  ...dialogProps,
  onPositiveClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | unknown
  >,
  onNegativeClick: Function as PropType<
  (e: MouseEvent) => Promise<boolean> | boolean | unknown
  >,
  onClose: Function as PropType<() => Promise<boolean> | boolean | unknown>
}

export default defineComponent({
  name: 'DialogEnvironment',
  props: {
    ...exposedDialogEnvProps,
    internalKey: {
      type: String,
      required: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    to: [String, Object] as PropType<string | HTMLElement>,
    // private
    onInternalAfterLeave: {
      type: Function as PropType<(key: string) => void>,
      required: true
    }
  },
  setup (props) {
    const showRef = ref(true)
    function handleAfterLeave (): void {
      props.onInternalAfterLeave(props.internalKey)
    }
    function handlePositiveClick (e: MouseEvent): void {
      const { onPositiveClick } = props
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick(e)).then((result) => {
          if (result === false) return
          hide()
        })
      } else {
        hide()
      }
    }
    function handleNegativeClick (e: MouseEvent): void {
      const { onNegativeClick } = props
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick(e)).then((result) => {
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
    function hide (): void {
      showRef.value = false
    }
    function handleUpdateShow (value: boolean): void {
      showRef.value = value
    }
    return () => {
      return (
        <NModal
          show={showRef.value}
          onUpdateShow={handleUpdateShow}
          appear
          dialog
          to={props.to}
          maskClosable={props.maskClosable}
          onAfterLeave={handleAfterLeave}
        >
          {{
            default: () => (
              <NDialog
                {...keep(props, dialogPropKeys)}
                onClose={handleCloseClick}
                onNegativeClick={handleNegativeClick}
                onPositiveClick={handlePositiveClick}
              />
            )
          }}
        </NModal>
      )
    }
  }
})
