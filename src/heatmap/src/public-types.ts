export type HeatmapData = HeatmapDataItem[]
export interface HeatmapDataItem {
  timestamp: number
  value?: number | null
}
export interface HeatmapTooltipSlotProps extends HeatmapDataItem {
  unit?: string
}

export interface HeatmapSlots {
  info?: () => any
  indicator?: () => any
  tooltip?: (data: HeatmapTooltipSlotProps) => any
}

export type HeatmapFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type { HeatmapColorTheme } from './theme'
