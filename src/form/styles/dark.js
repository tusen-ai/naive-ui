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
      textColorPrimaryOverlay,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      labelTextColor: textColorPrimaryOverlay,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
