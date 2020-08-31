import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Notification',
  theme: 'dark',
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
        default: closeOverlayColor,
        hover: closeHoverOverlayColor,
        active: closeOverlayColor
      },
      headerTextColor: primaryTextOverlayColor,
      contentTextColor: secondaryTextOverlayColor,
      descriptionTextColor: tertiaryTextOverlayColor,
      actionTextColor: secondaryTextOverlayColor
    }
  }
})
