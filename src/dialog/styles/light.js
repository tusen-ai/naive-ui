import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Dialog',
  getDerivedVars (vars) {
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
    } = vars
    return {
      titleTextColor: textColor1,
      textColor: textColor2,
      color: cardColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius: vars.borderRadius,
      titleFontWeight: vars.fontWeightStrong
    }
  }
})
