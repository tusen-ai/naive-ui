import { inject } from 'vue'
import { DialogApiInjection } from './DialogProvider'

export function useDialog (): DialogApiInjection | undefined {
  return inject<DialogApiInjection>('dialog')
}
