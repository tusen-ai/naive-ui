import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Confirm',
  getDerivedVariables ({ base, derived }) {
    const {
      parimaryTextColor,
      secondaryTextColor,
      cardBackgroundColor,
      closeColor,
      closeHoverColor,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      confirmTitleTextColor: parimaryTextColor,
      confirmTextColor: secondaryTextColor,
      confirmBackgroundColor: cardBackgroundColor,
      confirmCloseColor: {
        default: closeColor,
        hover: closeHoverColor,
        active: closeColor
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
