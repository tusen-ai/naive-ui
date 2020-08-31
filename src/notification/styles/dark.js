import create from '../../styles/_utils/create-component-base'
import avatarStyle from '../../avatar/styles/dark'

export default create({
  name: 'Notification',
  theme: 'dark',
  peer: [
    avatarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverBackgroundColor,
      closeOverlayColor,
      closeHoverOverlayColor,
      primaryTextOverlayColor,
      tertiaryTextOverlayColor
    } = derived
    const {
      borderRadius,
      strongFontWeight
    } = base
    return {
      borderRadius,
      headerFontWeight: strongFontWeight,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverBackgroundColor,
      textColor: secondaryTextOverlayColor,
      closeColor: closeOverlayColor,
      closeColorHover: closeHoverOverlayColor,
      closeColorActive: closeOverlayColor,
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextOverlayColor,
      descriptionTextColor: tertiaryTextOverlayColor,
      actionTextColor: secondaryTextOverlayColor
    }
  }
})
