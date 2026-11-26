import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDatePickerImpl from './src/DatePicker'

export type { DatePickerSlots } from './src/DatePicker'
export { datePickerProps } from './src/props'
export type * from './src/public-types'

export const NDatePicker: WithNativeAttrs<
  typeof NDatePickerImpl,
  HTMLAttributes
> = NDatePickerImpl
