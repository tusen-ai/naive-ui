import commonVariables from './_common'
import { gridDark } from '../../grid/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Form',
  common: commonDark,
  peers: {
    Grid: gridDark
  },
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
