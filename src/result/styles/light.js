import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'light',
  getDerivedVars (vars) {
    const {
      textColor2,
      textColor1,
      errorColor,
      successColor,
      infoColor,
      warningColor,
      lineHeight,
      fontWeightStrong
    } = vars
    return {
      ...sizeVariables,
      lineHeight,
      headerFontWeight: fontWeightStrong,
      headerTextColor: textColor1,
      descriptionTextColor: textColor2,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})
