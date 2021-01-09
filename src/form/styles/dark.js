import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Form',
  common: commonDark,
  self (vars) {
    const { textColor1Overlay, errorColor, warningColor, lineHeight } = vars
    return {
      ...commonVariables,
      lineHeight,
      labelTextColor: textColor1Overlay,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
}
