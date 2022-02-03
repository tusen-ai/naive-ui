import { createInjectionKey } from '../../_utils'
import type { LogInjection } from './Log'

export const logInjectionKey = createInjectionKey<LogInjection>('n-log')
