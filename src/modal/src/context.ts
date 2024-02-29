import { createInjectionKey } from '../../_utils'
import type {
  ModalApiInjection,
  ModalProviderInjection,
  ModalReactiveListInjection
} from './ModalProvider'

export const modalProviderInjectionKey =
  createInjectionKey<ModalProviderInjection>('n-modal-provider')

export const modalApiInjectionKey =
  createInjectionKey<ModalApiInjection>('n-modal-api')

export const modalReactiveListInjectionKey =
  createInjectionKey<ModalReactiveListInjection>('n-modal-reactive-list')
