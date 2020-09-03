import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Tabs',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      primaryColor,
      disabledTextColor,
      iconOverlayColor,
      disabledIconOverlayColor,
      closeColor,
      tabBackgroundOverlayColor,
      borderColor,
      primaryTextColor,
      dividerOverlayColor
    } = derived
    const {
      strongFontWeight,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      tabTextColorDefault: secondaryTextColor,
      tabTextColorActive: primaryColor,
      tabTextColorHover: primaryColor,
      tabTextColorDisabled: disabledTextColor,
      tabBarBackgroundColor: primaryColor,
      tabScrollButtonColorDefault: iconOverlayColor,
      tabScrollButtonColorDisabled: disabledIconOverlayColor,
      tabCloseButtonColorDeault: closeColor,
      cardTabBackgroundColor: tabBackgroundOverlayColor,
      cardTabBorderColor: borderColor,
      cardTabTextColorDefault: secondaryTextColor,
      cardTabTextColorActive: primaryTextColor,
      navBorderColor: dividerOverlayColor,
      panelTextColor: secondaryTextColor,
      strongFontWeight: strongFontWeight,
      borderRadius: borderRadius
    }
  }
})
