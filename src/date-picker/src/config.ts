export const START_YEAR = 1901
export const DEFAULT_RANGE = 200
// TODO: we need to remove it to make height customizable
export const MONTH_ITEM_HEIGHT = 40

export type DatePickerType =
  | 'date'
  | 'datetime'
  | 'daterange'
  | 'datetimerange'
  | 'month'
  | 'year'
  | 'quarter'
  | 'monthrange'
  | 'quarterrange'
  | 'yearrange'
  | 'week'
