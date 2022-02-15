import { createInjectionKey } from '../../_utils'
import type { NGridInjection } from './Grid'

export const defaultSpan = 1
export const gridInjectionKey = createInjectionKey<NGridInjection>('n-grid')
