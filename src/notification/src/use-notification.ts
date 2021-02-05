import { inject } from 'vue'
import { NotificationApiInjection } from './NotificationProvider'

export function useNotification (): NotificationApiInjection | undefined {
  return inject<NotificationApiInjection>('notification')
}
