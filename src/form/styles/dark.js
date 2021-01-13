import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Form',
  common: commonDark,
  self (vars) {
    const {
      textColor1Overlay,
      errorColor,
      warningColor,
      lineHeight,
      textColor3Overlay
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      labelTextColor: textColor1Overlay,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor,
      feedbackTextColor: textColor3Overlay
    }
  }
}
