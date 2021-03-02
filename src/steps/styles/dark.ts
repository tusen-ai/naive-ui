import { commonDark } from '../../_styles/common'
import commonVariables from './_common'
import type { StepsTheme } from './light'

const stepsDark: StepsTheme = {
  name: 'Steps',
  common: commonDark,
  self (vars) {
    const {
      fontWeightStrong,
      textColorDisabled,
      primaryColor,
      errorColor,
      textColor1,
      textColor2
    } = vars
    return {
      ...commonVariables,
      stepHeaderFontWeight: fontWeightStrong,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: textColorDisabled,
      indicatorTextColorFinish: primaryColor,
      indicatorTextColorError: errorColor,
      indicatorBorderColorProcess: primaryColor,
      indicatorBorderColorWait: textColorDisabled,
      indicatorBorderColorFinish: primaryColor,
      indicatorBorderColorError: errorColor,
      indicatorColorProcess: primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: textColorDisabled,
      splitorColorWait: textColorDisabled,
      splitorColorFinish: primaryColor,
      splitorColorError: textColorDisabled,
      headerTextColorProcess: textColor1,
      headerTextColorWait: textColorDisabled,
      headerTextColorFinish: textColorDisabled,
      headerTextColorError: errorColor,
      descriptionTextColorProcess: textColor2,
      descriptionTextColorWait: textColorDisabled,
      descriptionTextColorFinish: textColorDisabled,
      descriptionTextColorError: errorColor
    }
  }
}

export default stepsDark
