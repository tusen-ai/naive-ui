import type { VNodeChild } from 'vue'
import type { DatePickerDateCellSlotProps } from '../public-types'

export type DatePickerDateCellSlot = (
  props: DatePickerDateCellSlotProps
) => VNodeChild

export function renderDateCell(
  dateCellSlot: DatePickerDateCellSlot | undefined,
  dateObject: DatePickerDateCellSlotProps
): VNodeChild {
  return dateCellSlot ? dateCellSlot(dateObject) : dateObject.date
}
