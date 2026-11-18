import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NModalImpl from './src/Modal'

export { useModal, useModalReactiveList } from './src/composables'
export { modalProps } from './src/Modal'

export type { ModalProps, ModalSlots } from './src/Modal'
export { modalProviderProps, NModalProvider } from './src/ModalProvider'
export type {
  ModalApiInjection as ModalApi,
  ModalOptions,
  ModalProviderInst,
  ModalProviderProps,
  ModalReactive
} from './src/ModalProvider'

export const NModal: WithNativeAttrs<
  typeof NModalImpl,
  Omit<HTMLAttributes, 'aria-modal'>
> = NModalImpl
