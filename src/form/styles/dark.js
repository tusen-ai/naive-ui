import create from '../../styles/_utils/create-component-base'
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
      primaryTextOverlayColor,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      labelTextColor: primaryTextOverlayColor,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
