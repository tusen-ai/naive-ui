import { inject } from 'vue'
import type { MessageApiInjection } from './MessageProvider'

export function useMessage (): MessageApiInjection | undefined {
  return inject<MessageApiInjection>('message')
}
