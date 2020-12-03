import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Result',
  theme: 'dark',
  getLocalVars (vars) {
    const {
      textColor1Overlay,
      textColor2Overlay,
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
      headerTextColor: textColor1Overlay,
      descriptionTextColor: textColor2Overlay,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})
