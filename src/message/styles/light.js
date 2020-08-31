import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Message',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      baseBackgroundColor,
      closeColor,
      closeHoverColor,
      infoColor,
      successColor,
      errorColor,
      warningColor,
      popoverBackgroundColor
    } = derived
    const {
      popmenuBoxShadow
    } = base
    const coloredBoxShadow = '0px 2px 18px 0px rgba(0, 0, 0, 0.27)'
    return {
      textColor: {
        info: baseBackgroundColor,
        success: baseBackgroundColor,
        error: baseBackgroundColor,
        warning: baseBackgroundColor,
        loading: secondaryTextColor
      },
      iconColor: 'rgba(255, 255, 255, .45)',
      closeColor: {
        default: 'rgba(255, 255, 255, .5)',
        hover: 'rgba(255, 255, 255, .6)',
        active: 'rgba(255, 255, 255, .4)'
      },
      loadingCloseColor: {
        default: closeColor,
        hover: closeHoverColor,
        active: closeColor
      },
      color: {
        info: infoColor,
        success: successColor,
        error: errorColor,
        warning: warningColor,
        loading: popoverBackgroundColor
      },
      boxShadow: {
        info: coloredBoxShadow,
        success: coloredBoxShadow,
        error: coloredBoxShadow,
        warning: coloredBoxShadow,
        loading: popmenuBoxShadow
      }
    }
  }
})
