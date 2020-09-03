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
      labelTextColor: secondaryTextColor,
      labelTextColorActive: primaryColor,
      labelTextColorHover: primaryColor,
      labelTextColorDisabled: disabledTextColor,
      labelBarColor: primaryColor,
      scrollButtonColor: iconOverlayColor,
      scrollButtonColorDisabled: disabledIconOverlayColor,
      tabCloseColor: closeColor,
      tabColor: tabBackgroundOverlayColor,
      tabBorderColorActive: borderColor,
      tabTextColor: secondaryTextColor,
      tabTextColorActive: primaryTextColor,
      tabBorderColor: dividerOverlayColor,
      tabFontWeight: strongFontWeight,
      tabBorderRadius: borderRadius,
      paneTextColor: secondaryTextColor
    }
  }
})
