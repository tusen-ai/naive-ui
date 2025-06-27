import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme, type Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadius,
    fontSizeMini,
    fontSizeTiny,
    fontSizeSmall,
    fontWeight,
    textColor2,
    cardColor
  } = vars
  return {
    borderRadius,
    borderColor: cardColor,
    textColor: textColor2,
    fontWeight,
    loadingColorStart: 'rgba(0, 0, 0, 0.06)',
    loadingColorEnd: 'rgba(0, 0, 0, 0.12)',
    // Size-related properties
    rectSizeSmall: '8px',
    rectSizeMedium: '10px',
    rectSizeLarge: '12px',
    xGapSmall: '2px',
    xGapMedium: '3px',
    xGapLarge: '4px',
    yGapSmall: '2px',
    yGapMedium: '3px',
    yGapLarge: '4px',
    fontSizeSmall: fontSizeTiny,
    fontSizeMedium: fontSizeMini,
    fontSizeLarge: fontSizeSmall
  }
}

export type HeatmapThemeVars = ReturnType<typeof self>

const heatmapLight: Theme<'Heatmap', HeatmapThemeVars> = createTheme({
  name: 'Heatmap',
  common: commonLight,
  self
})

export default heatmapLight
export type HeatmapTheme = typeof heatmapLight
