import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseLight } from '../../_styles/base'
import { gridLight } from '../../grid/styles'

export default create({
  name: 'Form',
  theme: 'light',
  peer: [baseLight, gridLight],
  getLocalVars (vars) {
    const { textColor1, errorColor, warningColor } = vars
    return {
      ...commonVariables,
      labelTextColor: textColor1,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
