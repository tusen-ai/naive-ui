import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTimePickerImpl from './src/TimePicker'

export type { TimePickerInst } from './src/interface'
export type * from './src/public-types'
export { timePickerProps } from './src/TimePicker'
export type { TimePickerProps, TimePickerSlots } from './src/TimePicker'

export const NTimePicker: WithNativeAttrs<
  typeof NTimePickerImpl,
  HTMLAttributes
> = NTimePickerImpl
