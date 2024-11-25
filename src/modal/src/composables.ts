import type { ModalApiInjection, ModalReactive } from './ModalProvider'
import { inject, type Ref } from 'vue'
import { throwError } from '../../_utils'
import { modalApiInjectionKey, modalReactiveListInjectionKey } from './context'

export function useModal(): ModalApiInjection {
  const modal = inject(modalApiInjectionKey, null)
  if (modal === null) {
    throwError('use-modal', 'No outer <n-modal-provider /> founded.')
  }
  return modal
}

export function useModalReactiveList(): Ref<readonly ModalReactive[]> {
  const modalReactiveList = inject(modalReactiveListInjectionKey, null)
  if (modalReactiveList === null) {
    throwError(
      'use-modal-reactive-list',
      'No outer <n-modal-provider /> founded.'
    )
  }
  return modalReactiveList
}
