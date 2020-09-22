import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import gridStyle from '../../grid/styles/light'

export default create({
  name: 'Form',
  theme: 'light',
  peer: [gridStyle],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorPrimary,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      labelTextColor: textColorPrimary,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor
    }
  }
})
