import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import gridStyle from '../../grid/styles/dark'

export default create({
  name: 'Form',
  theme: 'dark',
  peer: [
    gridStyle
  ],
  getDerivedVars (vars) {
    const {
      textColor1Overlay,
      errorColor,
      warningColor
    } = vars
    return {
      ...commonVariables,
      labelTextColor: textColor1Overlay,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
