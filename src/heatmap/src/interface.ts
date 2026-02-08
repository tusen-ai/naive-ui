import type { HeatmapDataItem } from './public-types'

export interface DayRect extends HeatmapDataItem {
  color: string
  dayOfWeek: number // 0 = Sunday
  rowIndex: number // 0 = first row, relative to weekStartOn
  colIndex: number // column index in the matrix
}
