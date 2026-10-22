import type { ExtractThemeOverrides, Theme } from '../../_mixins/use-theme'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
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

export interface CollapseThemeVars extends ReturnType<typeof self> {}

const collapseLight: CollapseTheme = {
  name: 'Collapse',
  common: commonLight,
  self
}

export interface CollapseTheme extends Theme<'Collapse', CollapseThemeVars> {}

export interface CollapseThemeOverrides extends ExtractThemeOverrides<CollapseTheme> {}

export default collapseLight
