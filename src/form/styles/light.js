import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import gridStyle from '../../grid/styles/light'

export default create({
  name: 'Form',
  theme: 'light',
  peer: [gridStyle],
  getDerivedVars (vars) {
    const {
      textColor1,
      errorColor,
      warningColor
    } = vars
    return {
      ...commonVariables,
      labelTextColor: textColor1,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
