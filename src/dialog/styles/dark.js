import create from '../../styles/_utils/create-component-base'

export default create({
  theme: 'dark',
  name: 'Dialog',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
      modalColor,
      closeOverylayColor,
      colorColorHoverOverlay,
      closeActiveOverylayColor,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      titleTextColor: textColorPrimaryOverlay,
      textColor: textColorSecondaryOverlay,
      color: modalColor,
      closeColor: closeOverylayColor,
      closeColorHover: colorColorHoverOverlay,
      closeColorActive: closeActiveOverylayColor,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius: base.borderRadius,
      titleFontWeight: base.fontWeightStrong
    }
  }
})
