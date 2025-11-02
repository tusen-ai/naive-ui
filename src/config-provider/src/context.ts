import type { ConfigProviderInjection } from './internal-interface'
import { createInjectionKey } from '../../_utils'

export const configProviderInjectionKey
  = createInjectionKey<ConfigProviderInjection>('n-config-provider')
