import sizeVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Timeline',
  common: commonLight,
  self (vars) {
    const {
      textColor3,
      infoColor,
      errorColor,
      successColor,
      warningColor,
      textColor1,
      textColor2,
      railColorOverlay,
      fontWeightStrong,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      contentFontSize: fontSize,
      titleFontWeight: fontWeightStrong,
      circleBorder: `2px solid ${textColor3}`,
      circleBorderInfo: `2px solid ${infoColor}`,
      circleBorderError: `2px solid ${errorColor}`,
      circleBorderSuccess: `2px solid ${successColor}`,
      circleBorderWarning: `2px solid ${warningColor}`,
      titleTextColor: textColor1,
      contentTextColor: textColor2,
      metaTextColor: textColor3,
      lineColor: railColorOverlay
    }
  }
}
