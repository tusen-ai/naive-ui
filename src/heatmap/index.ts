import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NHeatmapImpl from './src/Heatmap'

export { heatmapProps } from './src/Heatmap'
export type { HeatmapProps } from './src/Heatmap'
export type * from './src/public-types'
export { heatmapMockData } from './src/utils'

export const NHeatmap: WithNativeAttrs<typeof NHeatmapImpl, HTMLAttributes>
  = NHeatmapImpl
