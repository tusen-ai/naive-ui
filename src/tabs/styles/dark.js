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
      labelTextColor: secondaryTextOverlayColor,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: disabledTextOverlayColor,
      labelBarColor: primaryColor,
      scrollButtonColor: iconOverlayColor,
      scrollButtonColorDisabled: disabledIconOverlayColor,
      tabCloseColor: closeOverlayColor,
      tabColor: tabBackgroundOverlayColor,
      tabBorderColorActive: 'transparent',
      tabTextColor: secondaryTextOverlayColor,
      tabTextColorActive: primaryTextOverlayColor,
      tabBorderColor: dividerOverlayColor,
      tabFontWeight: strongFontWeight,
      tabBorderRadius: borderRadius,
      paneTextColor: secondaryTextOverlayColor
    }
  }
})
