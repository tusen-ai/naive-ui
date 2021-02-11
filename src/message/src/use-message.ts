import { inject } from 'vue'
import { throwError } from '../../_utils'
import type { MessageApiInjection } from './MessageProvider'

export function useMessage (): MessageApiInjection {
  const api = inject<MessageApiInjection>('message')
  if (api === undefined) { throwError('use-message', 'No out <n-message-provider /> founded.') }
  return api
}
