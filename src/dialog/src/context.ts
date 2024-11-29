import type {
  DialogApiInjection,
  DialogReactiveListInjection
} from './DialogProvider'
import { createInjectionKey } from '../../_utils'

export const dialogApiInjectionKey
  = createInjectionKey<DialogApiInjection>('n-dialog-api')

export const dialogReactiveListInjectionKey
  = createInjectionKey<DialogReactiveListInjection>('n-dialog-reactive-list')
