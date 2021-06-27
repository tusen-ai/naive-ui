import { inject } from 'vue'
import { throwError } from '../../_utils'
import { messageApiInjectionKey } from './MessageProvider'
import type { MessageApiInjection } from './MessageProvider'

export function useMessage (): MessageApiInjection {
  const api = inject(messageApiInjectionKey, null)
  if (api === null) {
    throwError(
      'use-message',
      'No outer <n-message-provider /> founded. See Prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details.'
    )
  }
  return api
}
