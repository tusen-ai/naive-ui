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
      closeActiveOverylayColor,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      titleTextColor: primaryTextOverlayColor,
      textColor: secondaryTextOverlayColor,
      color: modalBackgroundColor,
      closeColor: closeOverylayColor,
      closeColorHover: closeHoverOverlayColor,
      closeColorActive: closeActiveOverylayColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius: base.borderRadius,
      titleFontWeight: base.strongFontWeight
    }
  }
})
