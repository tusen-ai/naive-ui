import type { VNode } from 'vue'

export type HeatmapData = HeatmapDataItem[]
export interface HeatmapDataItem {
  timestamp: number
  value?: number | null
}

export type HeatmapTooltipSlotProps = HeatmapDataItem

export interface HeatmapSlots {
  footer?: () => VNode[]
  indicator?: () => VNode[]
  'indicator-leading-text'?: () => VNode[]
  'indicator-trailing-text'?: () => VNode[]
  tooltip?: (props: HeatmapTooltipSlotProps) => VNode[]
}

export type HeatmapFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type { HeatmapColorTheme } from './theme'
