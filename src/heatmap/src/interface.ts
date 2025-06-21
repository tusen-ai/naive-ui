export interface RectData {
  date: number // timestamp
  value: number | null
}
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6
export interface DayRect extends RectData {
  color: string
  dayOfWeek: number // 0 = Sunday
  rowIndex: number // 0 = first row, relative to weekStartOn
  colIndex: number // column index in the matrix
}
export interface ToolTipData extends RectData {
  unit?: string
}
