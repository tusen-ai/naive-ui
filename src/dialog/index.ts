import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import { NDialog as NDialogImpl } from './src/Dialog'

export { useDialog, useDialogReactiveList } from './src/composables'
export type { DialogSlots } from './src/Dialog'
export { dialogProps } from './src/dialogProps'
export type { DialogProps } from './src/dialogProps'
export { dialogProviderProps, NDialogProvider } from './src/DialogProvider'
export type {
  DialogApiInjection as DialogApi,
  DialogOptions,
  DialogProviderInst,
  DialogProviderProps,
  DialogReactive
} from './src/DialogProvider'

export const NDialog: WithNativeAttrs<typeof NDialogImpl, HTMLAttributes>
  = NDialogImpl
