import type { Ref } from 'vue'
import type {
  MessageApiInjection,
  MessageProviderSetupProps
} from './MessageProvider'
import { createInjectionKey } from '../../_utils'

export const messageApiInjectionKey
  = createInjectionKey<MessageApiInjection>('n-message-api')

export const messageProviderInjectionKey = createInjectionKey<{
  props: MessageProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}>('n-message-provider')
