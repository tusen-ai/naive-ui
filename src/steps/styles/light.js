import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Steps',
  common: commonLight,
  self (vars) {
    const {
      fontWeightStrong,
      baseColor,
      textColorDisabled,
      primaryColor,
      errorColor,
      textColor1,
      textColor2
    } = vars
    return {
      ...commonVariables,
      stepHeaderFontWeight: fontWeightStrong,
      indicatorTextColorProcess: baseColor,
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
