export type OnUpdateValue = (value: number, time: DateItem) => void

export interface DateItem {
  year: number
  month: number
  date: number
}
