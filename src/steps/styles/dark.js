import { commonDark } from '../../_styles/new-common'
import commonVariables from './_common'

export default {
  name: 'Steps',
  common: commonDark,
  self (vars) {
    const {
      fontWeightStrong,
      textColorDisabledOverlay,
      primaryColor,
      errorColor,
      textColor1Overlay,
      textColor2Overlay
    } = vars
    return {
      ...commonVariables,
      stepHeaderFontWeight: fontWeightStrong,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: textColorDisabledOverlay,
      indicatorTextColorFinish: primaryColor,
      indicatorTextColorError: errorColor,
      indicatorBorderColorProcess: primaryColor,
      indicatorBorderColorWait: textColorDisabledOverlay,
      indicatorBorderColorFinish: primaryColor,
      indicatorBorderColorError: errorColor,
      indicatorColorProcess: primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: textColorDisabledOverlay,
      splitorColorWait: textColorDisabledOverlay,
      splitorColorFinish: primaryColor,
      splitorColorError: textColorDisabledOverlay,
      headerTextColorProcess: textColor1Overlay,
      headerTextColorWait: textColorDisabledOverlay,
      headerTextColorFinish: textColorDisabledOverlay,
      headerTextColorError: errorColor,
      descriptionTextColorProcess: textColor2Overlay,
      descriptionTextColorWait: textColorDisabledOverlay,
      descriptionTextColorFinish: textColorDisabledOverlay,
      descriptionTextColorError: errorColor
    }
  }
}
