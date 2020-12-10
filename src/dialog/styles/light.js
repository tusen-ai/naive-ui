import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'Dialog',
  getLocalVars (vars) {
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
      errorColor,
      dividerColor,
      borderRadius,
      fontWeightStrong
    } = vars
    return {
      ...commonVars,
      border: `1px solid ${dividerColor}`,
      headerTextColor: textColor1,
      textColor: textColor2,
      color: cardColor,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColorPressed,
      iconColorInfo: infoColor,
      iconColorSuccess: successColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      borderRadius,
      headerFontWeight: fontWeightStrong
    }
  }
})
