import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
  const {
    fontWeight,
    textColor1,
    textColor2,
    textColorDisabled,
    dividerColor,
    fontSize
  } = vars
  return {
    titleFontSize: fontSize,
    titleFontWeight: fontWeight,
    dividerColor,
    titleTextColor: textColor1,
    titleTextColorDisabled: textColorDisabled,
    fontSize,
    textColor: textColor2,
    arrowColor: textColor2,
    arrowColorDisabled: textColorDisabled,
    itemMargin: '16px 0 0 0',
    titlePadding: '16px 0 0 0'
  }
}

export type CollapseThemeVars = ReturnType<typeof self>

const collapseLight: Theme<'Collapse', CollapseThemeVars> = {
  name: 'Collapse',
  common: commonLight,
  self
}

export default collapseLight
export type CollapseTheme = typeof collapseLight
