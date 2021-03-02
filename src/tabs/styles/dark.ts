import sizeVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { TabsTheme } from './light'

const tabsDark: TabsTheme = {
  name: 'Tabs',
  common: commonDark,
  self (vars) {
    const {
      textColor2,
      primaryColor,
      textColorDisabled,
      closeColor,
      closeColorHover,
      closeColorPressed,
      tabColor,
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
      tabBorderColorActive: 'transparent',
      tabTextColor: textColor2,
      tabTextColorActive: textColor1,
      tabBorderColor: dividerColor,
      tabFontWeight: fontWeightStrong,
      tabBorderRadius: borderRadius,
      paneTextColor: textColor2
    }
  }
}

export default tabsDark
