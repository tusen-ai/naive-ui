import type { Ref } from 'vue'
import type {
  LoadingBarApiInjection,
  LoadingBarProviderSetupProps
} from './LoadingBarProvider'
import { createInjectionKey } from '../../_utils'

export const loadingBarProviderInjectionKey = createInjectionKey<{
  props: LoadingBarProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}>('n-loading-bar')

export const loadingBarApiInjectionKey
  = createInjectionKey<LoadingBarApiInjection>('n-loading-bar-api')
