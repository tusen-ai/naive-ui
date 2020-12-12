import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'Timeline',
  theme: 'light',
  peer: [baseLight],
  getLocalVars (vars) {
    const {
      textColor3,
      infoColor,
      errorColor,
      successColor,
      warningColor,
      textColor1,
      textColor2,
      railColorOverlay,
      fontWeightStrong
    } = vars
    return {
      ...sizeVariables,
      headerFontWeight: fontWeightStrong,
      circleBorderColor: textColor3,
      circleBorderColorInfo: infoColor,
      circleBorderColorError: errorColor,
      circleBorderColorSuccess: successColor,
      circleBorderColorWarning: warningColor,
      headerTextColor: textColor1,
      contentTextColor: textColor2,
      metaTextColor: textColor3,
      lineColor: railColorOverlay
    }
  }
})
