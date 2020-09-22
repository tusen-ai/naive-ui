import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Confirm',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimary,
      textColorSecondary,
      cardColor,
      closeColor,
      closeColorHover,
      closeColorPressed,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      titleTextColor: textColorPrimary,
      textColor: textColorSecondary,
      color: cardColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorActive: closeColorPressed,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius: base.borderRadius,
      titleFontWeight: base.fontWeightStrong
    }
  }
})
