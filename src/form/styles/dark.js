import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import suffixStyle from '../../_base/suffix/styles/dark'

export default create({
  name: 'Form',
  theme: 'dark',
  peer: [ suffixStyle ],
  getDerivedVariables ({ base, derived }) {
    const {
      primaryTextOverlayColor,
      errorColor,
      warningColor
    } = derived
    return {
      ...commonVariables,
      itemLabelTextColor: primaryTextOverlayColor,
      itemRequiredAsterisk: errorColor,
      itemFeedbackTextColorError: errorColor,
      itemFeedbackTextColorWarning: warningColor
    }
  }
})
