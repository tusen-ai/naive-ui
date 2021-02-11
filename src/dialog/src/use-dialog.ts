import { inject } from 'vue'
import { DialogApiInjection } from './DialogProvider'
import { throwError } from '../../_utils'

export function useDialog (): DialogApiInjection {
  const dialog = inject<DialogApiInjection>('dialog')
  if (dialog === undefined) { throwError('use-dialog', 'No outer <n-dialog-provider /> founded.') }
  return dialog
}
