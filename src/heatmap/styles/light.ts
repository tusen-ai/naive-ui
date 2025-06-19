import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme, type Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const {
    borderRadius,
    fontSizeMini,
    fontWeight,
    lineHeight,
    textColor2,
    textColor1,
    textColorDisabled,
    primaryColor,
    baseColor,
    hoverColor,
    cardColor,
    modalColor,
    popoverColor
  } = vars
  return {
    borderRadius,
    borderColor: cardColor,
    borderColorModal: modalColor,
    borderColorPopover: popoverColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    dayTextColor: textColorDisabled,
    fontSize: fontSizeMini,
    fontWeight,
    lineHeight,
    dateColorCurrent: primaryColor,
    dateTextColorCurrent: baseColor,
    cellColorHover: hoverColor,
    cellColorHoverModal: hoverColor,
    cellColorHoverPopover: hoverColor,
    cellColor: cardColor,
    cellColorModal: modalColor,
    cellColorPopover: popoverColor,
    barColor: primaryColor,
    loadingColorStart: 'rgba(0, 0, 0, 0.06)',
    loadingColorEnd: 'rgba(0, 0, 0, 0.12)'
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
