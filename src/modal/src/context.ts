import type {
  ModalApiInjection,
  ModalReactiveListInjection
} from './ModalProvider'
import { createInjectionKey } from '../../_utils'

export const modalApiInjectionKey
  = createInjectionKey<ModalApiInjection>('n-modal-api')

export const modalReactiveListInjectionKey
  = createInjectionKey<ModalReactiveListInjection>('n-modal-reactive-list')
