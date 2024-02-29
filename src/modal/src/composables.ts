import { inject, type Ref } from 'vue'
import { modalApiInjectionKey, modalReactiveListInjectionKey } from './context'
import type { ModalApiInjection, ModalReactive } from './ModalProvider'
import { throwError } from '../../_utils'

export function useModal (): ModalApiInjection {
  const modal = inject(modalApiInjectionKey, null)
  if (modal === null) {
    throwError('use-modal', 'No outer <n-modal-provider /> founded.')
  }
  return modal
}

export function useModalReactiveList (): Ref<readonly ModalReactive[]> {
  const modalReactiveList = inject(modalReactiveListInjectionKey, null)
  if (modalReactiveList === null) {
    throwError(
      'use-modal-reactive-list',
      'No outer <n-modal-provider /> founded.'
    )
  }
  return modalReactiveList
}
