import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { gridDark } from '../../grid/styles'

export default create({
  name: 'Form',
  theme: 'dark',
  peer: [baseDark, gridDark],
  getLocalVars (vars) {
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
})
