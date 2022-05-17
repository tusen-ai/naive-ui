import { createInjectionKey } from '../../_utils'
import type { FormInjection } from './interface'
import { InjectionKey, VNode } from 'vue'

export const formInjectionKey = createInjectionKey<FormInjection>('n-form')
export const formItemInstsInjectionKey =
  createInjectionKey<unknown>('n-form-item-insts')

export const formItemRenderFeedbackInjectionKey: InjectionKey<
(raw: string | undefined) => string | VNode
> = Symbol('n-form-item-render-feedback')
