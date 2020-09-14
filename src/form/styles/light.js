import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Form',
  theme: 'light',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextColor,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      itemLabelTextColor: primaryTextColor,
      itemRequiredAsterisk: errorColor,
      itemFeedbackTextColorError: errorColor,
      itemFeedbackTextColorWarning: warningColor
    }
  }
})
