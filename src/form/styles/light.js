import { commonLight } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Form',
  common: commonLight,
  self (vars) {
    const { textColor1, errorColor, warningColor, lineHeight } = vars
    return {
      ...commonVariables,
      lineHeight,
      labelTextColor: textColor1,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
}
