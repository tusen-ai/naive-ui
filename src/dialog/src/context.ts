import { createInjectionKey } from '../../_utils'
import type {
  DialogApiInjection,
  DialogProviderInjection
} from './DialogProvider'

export const dialogProviderInjectionKey =
  createInjectionKey<DialogProviderInjection>('n-dialog-provider')

export const dialogApiInjectionKey =
  createInjectionKey<DialogApiInjection>('n-dialog-api')
