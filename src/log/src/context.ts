import type { LogInjection } from './Log'
import { createInjectionKey } from '../../_utils'

export const logInjectionKey = createInjectionKey<LogInjection>('n-log')
