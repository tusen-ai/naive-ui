export type OnUpdateValue = (value: number, time: DateItem) => void

export interface DateItem {
  year: number
  month: number
  date: number
}

export type OnPanelChange = (info: { year: number, month: number }) => void

export interface CalendarDefaultSlotOptions {
  year: number
  month: number
  date: number
}

export interface CalendarHeaderSlotOptions {
  year: number
  month: number
}
