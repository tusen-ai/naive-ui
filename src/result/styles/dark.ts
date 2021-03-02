import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { ResultTheme } from './light'

const resultDark: ResultTheme = {
  name: 'Result',
  common: commonDark,
  self (vars) {
    const {
      textColor1,
      textColor2,
      errorColor,
      successColor,
      infoColor,
      warningColor,
      lineHeight,
      fontWeightStrong
    } = vars
    return {
      ...commonVariables,
      lineHeight,
      titleFontWeight: fontWeightStrong,
      titleTextColor: textColor1,
      textColor: textColor2,
      iconColorError: errorColor,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor
    }
  }
}

export default resultDark
