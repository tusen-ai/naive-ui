import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NAlertImpl from './src/Alert'

export { alertProps } from './src/Alert'
export type { AlertProps, AlertSlots } from './src/Alert'

export const NAlert: WithNativeAttrs<
  typeof NAlertImpl,
  Omit<HTMLAttributes, 'role'>
> = NAlertImpl
