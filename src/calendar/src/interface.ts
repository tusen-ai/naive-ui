export type OnUpdateValue = (value: number, time: DateItem) => void

export interface DateItem {
  year: number
  month: number
  date: number
}

export type OnPanelChange = (info: { year: number, month: number }) => void

export interface CalendarDefaultSlotProps {
  year: number
  month: number
  date: number
}

export interface CalendarHeaderSlotProps {
  year: number
  month: number
}
