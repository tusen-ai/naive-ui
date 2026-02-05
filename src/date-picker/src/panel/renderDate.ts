import type { VNodeChild } from 'vue'
import type { DatePickerDateSlotProps } from '../public-types'

export type DatePickerDateSlot = (props: DatePickerDateSlotProps) => VNodeChild

export function renderDate(
  dateSlot: DatePickerDateSlot | undefined,
  dateObject: DatePickerDateSlotProps
): VNodeChild {
  return dateSlot ? dateSlot(dateObject) : dateObject.date
}

