import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  name: 'Tabs',
  theme: 'light',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const {
      textColor2,
      primaryColor,
      textColorDisabled,
      iconColorOverlay,
      iconColorDisabledOverlay,
      closeColor,
      tabColorOverlay,
      borderColor,
      textColor1,
      dividerColorOverlay,
      fontWeightStrong,
      borderRadius
    } = vars
    return {
      ...sizeVariables,
      labelTextColor: textColor2,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: textColorDisabled,
      labelBarColor: primaryColor,
      scrollButtonColor: iconColorOverlay,
      scrollButtonColorDisabled: iconColorDisabledOverlay,
      tabCloseColor: closeColor,
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
})
