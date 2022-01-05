import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import commonVariables from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    textColor1,
    errorColor,
    warningColor,
    lineHeight,
    textColor3
  } = vars
  return {
    ...commonVariables,
    blankHeightSmall: heightSmall,
    blankHeightMedium: heightMedium,
    blankHeightLarge: heightLarge,
    lineHeight,
    labelTextColor: textColor1,
    asteriskColor: errorColor,
    feedbackTextColorError: errorColor,
    feedbackTextColorWarning: warningColor,
    feedbackTextColor: textColor3
  }
}

export type FormThemeVars = ReturnType<typeof self>

const formLight: Theme<'Form', FormThemeVars> = {
  name: 'Form',
  common: commonLight,
  self
}

export default formLight
export type FormTheme = typeof formLight
