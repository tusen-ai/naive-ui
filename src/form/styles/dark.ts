import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { FormTheme } from './light'

const formItemDark: FormTheme = {
  name: 'Form',
  common: commonDark,
  self (vars) {
    const {
      textColor1,
      errorColor,
      warningColor,
      lineHeight,
      textColor3
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      labelTextColor: textColor1,
      asteriskColor: errorColor,
      feedbackTextColorError: errorColor,
      feedbackTextColorWarning: warningColor,
      feedbackTextColor: textColor3
    }
  }
}

export default formItemDark
