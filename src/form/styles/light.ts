import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import commonVariables from './_common'

const self = (vars: ThemeCommonVars) => {
  const { textColor1, errorColor, warningColor, lineHeight, textColor3 } = vars
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

export type FormThemeVars = ReturnType<typeof self>

const formLight: Theme<FormThemeVars> = {
  name: 'Form',
  common: commonLight,
  self
}

export default formLight
export type FormTheme = typeof formLight
