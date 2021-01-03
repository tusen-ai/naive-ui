import commonVariables from './_common'
import { gridLight } from '../../grid/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Form',
  common: commonLight,
  peers: {
    Grid: gridLight
  },
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
