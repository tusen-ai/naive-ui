import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import gridStyle from '../../grid/styles/dark'

export default create({
  name: 'Form',
  theme: 'dark',
  peer: [
    gridStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColor1Overlay,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      labelTextColor: textColor1Overlay,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
