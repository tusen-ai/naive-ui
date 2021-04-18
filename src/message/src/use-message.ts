import { inject } from 'vue'
import { throwError } from '../../_utils'
import { messageApiInjectionKey } from './MessageProvider'
import type { MessageApiInjection } from './MessageProvider'

export function useMessage (): MessageApiInjection {
  const api = inject(messageApiInjectionKey, null)
  if (api === null) {
    throwError('use-message', 'No outer <n-message-provider /> founded.')
  }
  return api
}
