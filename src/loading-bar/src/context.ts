import type { Ref } from 'vue'
import { createInjectionKey } from '../../_utils'
import type {
  LoadingBarApiInjection,
  LoadingBarProviderSetupProps
} from './LoadingBarProvider'

export const loadingBarProviderInjectionKey = createInjectionKey<{
  props: LoadingBarProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}>('n-loading-bar')

export const loadingBarApiInjectionKey =
  createInjectionKey<LoadingBarApiInjection>('n-loading-bar-api')
