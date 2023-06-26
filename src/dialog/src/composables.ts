import { inject, type Ref } from 'vue'
import {
  dialogApiInjectionKey,
  dialogReactiveListInjectionKey
} from './context'
import type { DialogApiInjection, DialogReactive } from './DialogProvider'
import { throwError } from '../../_utils'

export function useDialog (): DialogApiInjection {
  const dialog = inject(dialogApiInjectionKey, null)
  if (dialog === null) {
    throwError('use-dialog', 'No outer <n-dialog-provider /> founded.')
  }
  return dialog
}

export function useDialogReactiveList (): Ref<readonly DialogReactive[]> {
  const dialogReactiveList = inject(dialogReactiveListInjectionKey, null)
  if (dialogReactiveList === null) {
    throwError(
      'use-dialog-reactive-list',
      'No outer <n-dialog-provider /> founded.'
    )
  }
  return dialogReactiveList
}
