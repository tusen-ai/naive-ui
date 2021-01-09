import sizeVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Tabs',
  common: commonLight,
  self (vars) {
    const {
      textColor2,
      primaryColor,
      textColorDisabled,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeColor,
      closeColorHover,
      closeColorPressed,
      tabColorOverlay,
      borderColor,
      textColor1,
      dividerColorOverlay,
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
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      tabColor: tabColorOverlay,
      tabBorderColorActive: borderColor,
      tabTextColor: textColor2,
      tabTextColorActive: textColor1,
      tabBorderColor: dividerColorOverlay,
      tabFontWeight: fontWeightStrong,
      tabBorderRadius: borderRadius,
      paneTextColor: textColor2
    }
  }
}
