import type { NotificationProviderInjection } from './NotificationProvider'
import { createInjectionKey } from '../../_utils'

export const notificationProviderInjectionKey
  = createInjectionKey<NotificationProviderInjection>('n-notification-provider')
