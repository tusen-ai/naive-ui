import { inject } from 'vue'
import { throwError } from '../../_utils'
import { messageApiInjectionKey } from './context'
import type { MessageApiInjection } from './MessageProvider'

export function useMessage (): MessageApiInjection {
  const api = inject(messageApiInjectionKey, null)
  if (api === null) {
    throwError(
      'use-message',
      'No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A.'
    )
  }
  return api
}
