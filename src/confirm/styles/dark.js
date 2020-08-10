import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Confirm',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
      modalBackgroundColor,
      closeOverylayColor,
      closeHoverOverlayColor,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      confirmTitleTextColor: primaryTextOverlayColor,
      confirmTextColor: secondaryTextOverlayColor,
      confirmBackgroundColor: modalBackgroundColor,
      confirmCloseColor: {
        default: closeOverylayColor,
        hover: closeHoverOverlayColor,
        avtive: closeOverylayColor
      },
      confirmIconColor: {
        info: infoColor,
        success: successColor,
        warning: warningColor,
        error: errorColor
      },
      borderRadius: base.borderRadius
    }
  }
})
