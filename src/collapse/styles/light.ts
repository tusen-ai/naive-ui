import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    fontWeight,
    textColor1,
    textColor2,
    dividerColorOverlay,
    fontSize
  } = vars
  return {
    titleFontSize: fontSize,
    titleFontWeight: fontWeight,
    dividerColor: dividerColorOverlay,
    titleTextColor: textColor1,
    fontSize: fontSize,
    textColor: textColor2,
    arrowColor: textColor2
  }
}

export type CollapseThemeVars = ReturnType<typeof self>

const collapseLight: Theme<CollapseThemeVars> = {
  name: 'Collapse',
  common: commonLight,
  self
}

export default collapseLight
export type CollapseTheme = typeof collapseLight
