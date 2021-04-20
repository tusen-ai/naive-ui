import sizeVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    primaryColor,
    textColorDisabled,
    closeColor,
    closeColorHover,
    closeColorPressed,
    tabColor,
    borderColor,
    textColor1,
    dividerColor,
    fontWeightStrong,
    borderRadius,
    fontSize
  } = vars
  return {
    ...sizeVariables,
    labelFontSizeCard: fontSize,
    labelTextColor: textColor2,
    labelTextColorActive: primaryColor,
    labelTextColorHover: primaryColor,
    labelTextColorDisabled: textColorDisabled,
    labelBarColor: primaryColor,
    closeColor: closeColor,
    closeColorHover: closeColorHover,
    closeColorPressed: closeColorPressed,
    tabColor: tabColor,
    tabBorderColorActive: borderColor,
    tabTextColor: textColor2,
    tabTextColorActive: textColor1,
    tabBorderColor: dividerColor,
    tabFontWeight: fontWeightStrong,
    tabBorderRadius: borderRadius,
    paneTextColor: textColor2
  }
}

export type TabsThemeVars = ReturnType<typeof self>

const tabsLight: Theme<'Tabs', TabsThemeVars> = {
  name: 'Tabs',
  common: commonLight,
  self
}

export default tabsLight
export type TabsTheme = typeof tabsLight
