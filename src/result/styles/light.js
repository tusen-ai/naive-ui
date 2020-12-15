import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'
import { iconLight } from '../../icon/styles'

export default create({
  name: 'Result',
  theme: 'light',
  peer: [baseLight, iconLight],
  getLocalVars (vars) {
    const {
      textColor2,
      textColor1,
      errorColor,
      successColor,
      infoColor,
      warningColor,
      lineHeight,
      fontWeightStrong,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      lineHeight,
      headerFontWeight: fontWeightStrong,
      headerTextColor: textColor1,
      descriptionTextColor: textColor2,
      descriptionFontSize: fontSize,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
})
