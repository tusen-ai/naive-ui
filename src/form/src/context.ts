import { createInjectionKey } from '../../_utils'
import type { FormInjection } from './interface'

export const formInjectionKey = createInjectionKey<FormInjection>('n-form')
export const formItemInstsInjectionKey =
  createInjectionKey<unknown>('n-form-item-insts')
