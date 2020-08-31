import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Notification',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
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
      strongFontWeight,
      avatarFill: {
        default: secondaryTextOverlayColor,
        success: successColor,
        info: infoColor,
        warning: warningColor,
        error: errorColor
      },
      color: popoverBackgroundColor,
      textColor: secondaryTextOverlayColor,
      closeColor: {
        default: closeColor,
        hover: closeHoverColor,
        active: closeColor
      },
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextOverlayColor,
      descriptionTextColor: tertiaryTextOverlayColor,
      actionTextColor: secondaryTextOverlayColor
    }
  }
})
