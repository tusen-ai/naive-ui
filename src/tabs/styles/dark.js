import create from '../../styles/_utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Tabs',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      primaryColor,
      disabledTextOverlayColor,
      iconOverlayColor,
      disabledIconOverlayColor,
      closeOverlayColor,
      tabBackgroundOverlayColor,
      primaryTextOverlayColor,
      dividerOverlayColor
    } = derived
    const {
      strongFontWeight,
      borderRadius
    } = base
    return {
      ...sizeVariables,
      tabTextColorDefault: secondaryTextOverlayColor,
      tabTextColorActive: primaryColor,
      tabTextColorHover: primaryColor,
      tabTextColorDisabled: disabledTextOverlayColor,
      tabBarBackgroundColor: primaryColor,
      tabScrollButtonColorDefault: iconOverlayColor,
      tabScrollButtonColorDisabled: disabledIconOverlayColor,
      tabCloseButtonColorDeault: closeOverlayColor,
      cardTabBackgroundColor: tabBackgroundOverlayColor,
      cardTabBorderColor: 'transparent',
      cardTabTextColorDefault: secondaryTextOverlayColor,
      cardTabTextColorActive: primaryTextOverlayColor,
      navBorderColor: dividerOverlayColor,
      panelTextColor: secondaryTextOverlayColor,
      strongFontWeight: strongFontWeight,
      borderRadius: borderRadius
    }
  }
})
