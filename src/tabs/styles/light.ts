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
    dividerColor,
    fontWeight,
    fontWeightStrong,
    borderRadius,
    fontSize
  } = vars
  return {
    ...sizeVariables,
    tabFontSizeCard: fontSize,
    tabTextColorLine: textColor2,
    tabTextColorActiveLine: primaryColor,
    tabTextColorHoverLine: primaryColor,
    tabTextColorDisabledLine: textColorDisabled,
    tabTextColorBar: textColor2,
    tabTextColorActiveBar: primaryColor,
    tabTextColorHoverBar: primaryColor,
    tabTextColorDisabledBar: textColorDisabled,
    tabTextColorCard: textColor2,
    tabTextColorHoverCard: textColor2,
    tabTextColorActiveCard: primaryColor,
    tabTextColorDisabledCard: textColorDisabled,
    barColor: primaryColor,
    closeColor,
    closeColorHover,
    closeColorPressed,
    tabColor,
    tabBorderColor: dividerColor,
    tabFontWeightActive: fontWeightStrong,
    tabFontWeight: fontWeight,
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
