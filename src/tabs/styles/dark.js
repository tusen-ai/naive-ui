import sizeVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Tabs',
  common: commonDark,
  self (vars) {
    const {
      textColor2Overlay,
      primaryColor,
      textColorDisabledOverlay,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay,
      tabColorOverlay,
      textColor1Overlay,
      dividerColorOverlay,
      fontWeightStrong,
      borderRadius,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      labelFontSizeCard: fontSize,
      labelTextColor: textColor2Overlay,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: textColorDisabledOverlay,
      labelBarColor: primaryColor,
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      tabColor: tabColorOverlay,
      tabBorderColorActive: 'transparent',
      tabTextColor: textColor2Overlay,
      tabTextColorActive: textColor1Overlay,
      tabBorderColor: dividerColorOverlay,
      tabFontWeight: fontWeightStrong,
      tabBorderRadius: borderRadius,
      paneTextColor: textColor2Overlay
    }
  }
}
