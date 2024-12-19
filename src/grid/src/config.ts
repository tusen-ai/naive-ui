import type { NGridInjection } from './Grid'
import { createInjectionKey } from '../../_utils'

export const defaultSpan = 1
export const gridInjectionKey = createInjectionKey<NGridInjection>('n-grid')
