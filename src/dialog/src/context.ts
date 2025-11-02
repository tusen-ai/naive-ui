import type {
  DialogApiInjection,
  DialogProviderInjection,
  DialogReactiveListInjection
} from './DialogProvider'
import { createInjectionKey } from '../../_utils'

export const dialogProviderInjectionKey
  = createInjectionKey<DialogProviderInjection>('n-dialog-provider')

export const dialogApiInjectionKey
  = createInjectionKey<DialogApiInjection>('n-dialog-api')

export const dialogReactiveListInjectionKey
  = createInjectionKey<DialogReactiveListInjection>('n-dialog-reactive-list')
