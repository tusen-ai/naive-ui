import type { FormInjection } from './interface'
import { createInjectionKey } from '../../_utils'

export const formInjectionKey = createInjectionKey<FormInjection>('n-form')
export const formItemInstsInjectionKey
  = createInjectionKey<unknown>('n-form-item-insts')
