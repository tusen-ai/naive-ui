export interface RectData {
  date: Date
  value: number | null
}
export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6
export interface DayRect {
  date: Date
  value: number | null
  color: string
  dayOfWeek: number // 0 = Sunday
  rowIndex: number // 0 = first row, relative to weekStartOn
  colIndex: number // column index in the matrix
}
