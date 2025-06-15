import type { Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self() {
  return {}
}

export type HeatmapThemeVars = ReturnType<typeof self>

const heatmapLight: Theme<'Heatmap', HeatmapThemeVars> = {
  name: 'Heatmap',
  common: commonLight,
  self
}

export default heatmapLight
export type HeatmapTheme = typeof heatmapLight
