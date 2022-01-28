import { createInjectionKey } from '../../_utils'
import type { ConfigProviderInjection } from './internal-interface'

export const configProviderInjectionKey =
  createInjectionKey<ConfigProviderInjection>('n-config-provider')
