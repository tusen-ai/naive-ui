import { inject } from 'vue'
import { dialogApiInjectionKey } from './DialogProvider'
import type { DialogApiInjection } from './DialogProvider'
import { throwError } from '../../_utils'

export function useDialog (): DialogApiInjection {
  const dialog = inject(dialogApiInjectionKey, null)
  if (dialog === null) {
    throwError('use-dialog', 'No outer <n-dialog-provider /> founded.')
  }
  return dialog
}
