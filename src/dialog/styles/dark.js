import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Dialog',
  getDerivedVars (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
      modalColor,
      closeOverylayColor,
      colorColorHoverOverlay,
      closeActiveOverylayColor,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = vars
    return {
      titleTextColor: textColor1Overlay,
      textColor: textColor2Overlay,
      color: modalColor,
      closeColor: closeOverylayColor,
      closeColorHover: colorColorHoverOverlay,
      closeColorPressed: closeActiveOverylayColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius: vars.borderRadius,
      titleFontWeight: vars.fontWeightStrong
    }
  }
})
