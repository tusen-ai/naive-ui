import type { NotificationApiInjection } from './NotificationProvider'
import { inject } from 'vue'
import { throwError } from '../../_utils'
import { notificationApiInjectionKey } from './NotificationProvider'

export function useNotification(): NotificationApiInjection {
  const api = inject(notificationApiInjectionKey, null)
  if (api === null) {
    throwError('use-notification', 'No outer `n-notification-provider` found.')
  }
  return api
}
