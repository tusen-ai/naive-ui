import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Dialog',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1,
      textColor2,
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
      titleTextColor: textColor1,
      textColor: textColor2,
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
