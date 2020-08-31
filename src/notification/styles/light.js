import create from '../../styles/_utils/create-component-base'
import avatarStyle from '../../avatar/styles/dark'

export default create({
  name: 'Notification',
  theme: 'light',
  peer: [
    avatarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverBackgroundColor,
      closeColor,
      closeHoverColor,
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
      textColor: secondaryTextColor,
      closeColor: closeColor,
      closeColorHover: closeHoverColor,
      closeColorActive: closeColor,
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextColor,
      descriptionTextColor: tertiaryTextOverlayColor,
      actionTextColor: secondaryTextColor
    }
  }
})
