import type { Ref } from 'vue'
import { createInjectionKey } from '../../_utils'
import type {
  MessageApiInjection,
  MessageProviderSetupProps
} from './MessageProvider'

export const messageApiInjectionKey =
  createInjectionKey<MessageApiInjection>('n-message-api')

export const messageProviderInjectionKey = createInjectionKey<{
  props: MessageProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}>('n-message-provider')
