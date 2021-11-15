export const START_YEAR = 1901
// TODO: we need to remove it to make height customizable
export const MONTH_ITEM_HEIGHT = 40

export const DATE_FORMAT = {
  date: 'yyyy-MM-dd',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  month: 'yyyy-MM',
  year: 'yyyy'
}

export type DatePickerType = keyof typeof DATE_FORMAT
