import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { baseDark } from '../../_styles/base'
import { iconDark } from '../../icon/styles'

export default create({
  theme: 'dark',
  name: 'Steps',
  peer: [baseDark, iconDark],
  getLocalVars (vars) {
    return {
      ...commonVariables,
      stepHeaderFontWeight: vars.fontWeightStrong,
      indicatorTextColorProcess: 'black',
      indicatorTextColorWait: vars.textColorDisabledOverlay,
      indicatorTextColorFinish: vars.primaryColor,
      indicatorTextColorError: vars.errorColor,
      indicatorBorderColorProcess: vars.primaryColor,
      indicatorBorderColorWait: vars.textColorDisabledOverlay,
      indicatorBorderColorFinish: vars.primaryColor,
      indicatorBorderColorError: vars.errorColor,
      indicatorColorProcess: vars.primaryColor,
      indicatorColorWait: 'transparent',
      indicatorColorFinish: 'transparent',
      indicatorColorError: 'transparent',
      splitorColorProcess: vars.textColorDisabledOverlay,
      splitorColorWait: vars.textColorDisabledOverlay,
      splitorColorFinish: vars.primaryColor,
      splitorColorError: vars.textColorDisabledOverlay,
      headerTextColorProcess: vars.textColor1Overlay,
      headerTextColorWait: vars.textColorDisabledOverlay,
      headerTextColorFinish: vars.textColorDisabledOverlay,
      headerTextColorError: vars.errorColor,
      descriptionTextColorProcess: vars.textColor2Overlay,
      descriptionTextColorWait: vars.textColorDisabledOverlay,
      descriptionTextColorFinish: vars.textColorDisabledOverlay,
      descriptionTextColorError: vars.errorColor
    }
  }
})
